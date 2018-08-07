import { Injectable } from '@angular/core';
import StellarSdk from 'stellar-sdk';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StellarService {
  public server: any;

  constructor() {
    this.server = new StellarSdk.Server(environment.serverUrl);
    if (environment.production) {
      StellarSdk.Network.usePublicNetwork();
    } else {
      StellarSdk.Network.useTestNetwork();
    }
  }

  createTrust(receivingAccountSecretKey: string): Observable<{}> {
    const receivingKeys = StellarSdk.Keypair.fromSecret(receivingAccountSecretKey);
    const CLPX = new StellarSdk.Asset(environment.assetCode, environment.issuer);

    return Observable.fromPromise(
      this.server
        .loadAccount(receivingKeys.publicKey())
        .catch(StellarSdk.NotFoundError, error => {
          throw new Error('The destination account does not exist!');
        })
        .then(receiver => {
          const transaction = new StellarSdk.TransactionBuilder(receiver)
            .addOperation(
              StellarSdk.Operation.changeTrust({
                asset: CLPX,
              })
            )
            .build();
          transaction.sign(receivingKeys);
          return this.server.submitTransaction(transaction);
        })
        .then(result => {
          console.log('result', result);
          return result;
        })
        .catch(error => {
          console.log(error);
          this.HandleError(error);
        })
    );
  }

  createTrustForLedger(publicKey: string): Observable<{}> {
    const CLPX = new StellarSdk.Asset(environment.assetCode, environment.issuer);

    return Observable.fromPromise(
      this.server
        .loadAccount(publicKey)
        .catch(StellarSdk.NotFoundError, error => {
          throw new Error('The destination account does not exist!');
        })
        .then(receiver => {
          const transaction = new StellarSdk.TransactionBuilder(receiver)
            .addOperation(
              StellarSdk.Operation.changeTrust({
                asset: CLPX,
              })
            )
            .build();

          console.log('transaction', transaction);
          return transaction;
        })
        .catch(error => {
          console.log(error);
          this.HandleError(error);
        })
    );
  }

  submitTrustlineForLedger(transaction, signature, publicKey) {
    console.log('final', transaction);
    const keyPair = StellarSdk.Keypair.fromPublicKey(publicKey);
    const hint = keyPair.signatureHint();
    const decorated = new StellarSdk.xdr.DecoratedSignature({ hint: hint, signature: signature });
    transaction.signatures.push(decorated);

    return Observable.fromPromise(this.server.submitTransaction(transaction));
  }

  getPublicKey(secretKey: string): Observable<{}> {
    return Observable.of(StellarSdk.Keypair.fromSecret(secretKey).publicKey())
      .map((res: any) => res)
      .catch((e: any) => Observable.throw(this.HandleError(e)));
  }

  validateKey(secretKey: string) {
    return StellarSdk.StrKey.isValidEd25519SecretSeed(secretKey);
  }

  getAccount(publicKey: string): Observable<{}> {
    return Observable.fromPromise(
      this.server
        .loadAccount(publicKey)
        .then(account => {
          return account;
        })
        .catch(error => {
          console.log('errr', error);
          const res = {
            balances: 'none',
          };
          return res;
        })
    );
  }

  HandleError(error: {}) {
    console.log('Error here' + error);
    return Observable.throw(error || 'Server error');
  }
}
