import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { AwsService } from '../aws/aws.service';
import { User } from './user-model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private aws: AwsService, private auth: AuthService) {}


  getUserById(id) {
    return this.aws.query<User>(env.tableUser, { id }).map(r => r[0]);
  }

  getUserTrustline() {
    console.log('idtoken', this.auth.getIdToken());
    return this.http.request('GET', `${env.apiURL}/trust/validate`, {
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + this.auth.getIdToken(),
      },
    });
  }

  generateKeypair() {
    return this.http.request('GET', `${env.apiURL}/create-account`, {
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + this.auth.getIdToken(),
      },
    });
  }

  updateUserAddress(data: { address; currency? }, type: 'sending' | 'receiving') {
    const address = data.address.replace(/\s/g, '');

    return this.http.request('POST', `${env.apiURL}/wallet-address/${type}`, {
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + this.auth.getIdToken(),
      },
      body: JSON.stringify({
        address: address,
        ...(data.currency
          ? {
              currency: data.currency,
            }
          : {}),
      }),
    });
  }

  fundLumens(receiving_wallet_address: string) {
    return this.http.request('POST', `${env.apiURL}/fund-lumens`, {
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + this.auth.getIdToken(),
      },
      body: JSON.stringify({
        address: receiving_wallet_address,
      }),
    });
  }
}
