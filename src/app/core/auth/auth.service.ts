import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import * as jwtDecode from 'jwt-decode';
import { environment as env } from '../../../environments/environment';
import { UserService } from '../user';

const config = {
  userPoolId: env.userPoolId,
  clientId: env.clientId,
  region: env.region,
  identityPoolId: env.identityPoolId,
};

const idp = `cognito-idp.${env.region}.amazonaws.com/${env.userPoolId}`;

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  private cognitoUser: CognitoUser;

  constructor(private router: Router) {
    AWS.config.update({ region: config.region });

    const poolData = {
      UserPoolId: config.userPoolId,
      ClientId: config.clientId,
    };

    this.userPool = new CognitoUserPool(poolData);

    if (this.isAuthenticated()) {
      const userData = {
        Username: this.userPool.getCurrentUser().getUsername(),
        Pool: this.userPool,
      };

      this.cognitoUser = new CognitoUser(userData);
    }
  }

  authenticateUser({ username, password }): Promise<any> {
    localStorage.clear();
    return new Promise((resolve, reject) => {
      const authenticationData = {
        Username: username,
        Password: password,
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);

      const userData = {
        Username: username,
        Pool: this.userPool,
      };

      this.cognitoUser = new CognitoUser(userData);
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          console.log('result', result);
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log('id token', result.getIdToken().getJwtToken());

          this.updateCredentials(result.getIdToken().getJwtToken());
          const decodedIdToken = jwtDecode(result.getIdToken().getJwtToken());

          // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          const AWSconfigcredentials = AWS.config.credentials as any;
          AWSconfigcredentials.refresh(error => {
            if (error) {
              console.log('error on refresh', error);
              return reject(error);
            } else {
              // Instantiate aws sdk service objects now that the credentials have been updated.
              // example: const s3 = new AWS.S3();
              console.log('Successfully logged!');

              this.cognitoUser.getSession((err, session) => {
                if (err) {
                  console.log(err);
                }

                console.log('session validity: ' + session.isValid());
                resolve(result.getIdToken().getJwtToken());
              });
              // resolve(decodedIdToken);
            }
          });
        },

        onFailure: err => {
          console.log('failed', err);
          reject(err);
        },
      });
    });
  }

  signOut() {
    if (this.cognitoUser) {
      this.cognitoUser.signOut();
    }

    if (AWS.config.credentials) {
      const awsc = AWS.config.credentials as any;
      awsc.clearCachedId();
    }

    localStorage.clear();
    this.router.navigate(['/login']);
  }

  updateCredentials(idToken) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      {
        IdentityPoolId: env.identityPoolId,
        Logins: { [idp]: idToken },
        DurationSeconds: 900,
      },
      { region: env.region }
    );

    console.log('identityId', this.getCurrentUserId());
  }

  isAuthenticated() {
    const cognitoUser = this.userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        const idToken = cognitoUser
          .getSignInUserSession()
          .getIdToken()
          .getJwtToken();

        if (!AWS.config.credentials) {
          console.log('updating credentials');
          this.updateCredentials(idToken);
        }
      });
    }

    return cognitoUser !== null;
  }

  getIdToken() {
    const cognitoUser = this.userPool.getCurrentUser() as any;

    if (cognitoUser) {
      const key = `CognitoIdentityServiceProvider.${env.clientId}.${cognitoUser.username}.idToken`;
      const idToken = localStorage.getItem(key);
      return idToken;
    }

    return null;
  }

  getCurrentUser() {
    return this.userPool.getCurrentUser();
  }

  getCurrentUserId() {
    // @ts-ignore
    const awsc = AWS.config.credentials as any;
    const key = `aws.cognito.identity-id.${env.identityPoolId}`;
    const localIdentityId = localStorage.getItem(key);

    return awsc.identityId || localIdentityId;
  }

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      this.cognitoUser = new CognitoUser(userData);

      this.cognitoUser.forgotPassword({
        onSuccess: result => {
          console.log('call result: ' + result);
        },
        onFailure: err => {
          console.log(err);
          reject(err);
        },
        inputVerificationCode: data => {
          resolve();
        },
      });
    });
  }

  resetPassword(verificationCode, newPassword) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          console.log('call result: ');
          resolve();
        },
        onFailure: err => {
          reject();
        },
      });
    });
  }
}
