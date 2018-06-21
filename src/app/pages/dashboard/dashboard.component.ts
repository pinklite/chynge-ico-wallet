import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserService, User, KycStatus } from '../../core/user';
import { AuthService } from '../../core/auth';
import { StellarService } from '../../core/stellar';

import { KeypairLoadingComponent } from './keypair-loading/keypair-loading.component';
import { KeypairResultComponent } from './keypair-result/keypair-result.component';
import { SecretKeyLoadingComponent } from './secret-key-loading/secret-key-loading.component';
import { KeypairConfirmationComponent } from './keypair-confirmation/keypair-confirmation.component';
import { TrustlineLoadingComponent } from './trustline-loading/trustline-loading.component';
import { TrustlineConfirmationComponent } from './trustline-confirmation/trustline-confirmation.component';
import { TrustlineResultComponent } from './trustline-result/trustline-result.component';
import { Location } from '@angular/common';

import { NgForm } from '@angular/forms';
import LedgerTransport from '@ledgerhq/hw-transport-u2f';
import LedgerStellar from '@ledgerhq/hw-app-str';
import StellarSdk from 'stellar-sdk';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loginYourKey;
  public automatically: boolean;

  public currentUser: User = {} as any;
  public walletTrusted: boolean;

  public keypair: { public; secret } = {} as any;
  public keypairForm: FormGroup;
  public inputSecretKeyLogin: FormControl;
  public loginAgreement: FormControl;
  public createTrustlineAgreement: FormControl;
  public createTrustlineAgreementLedger: FormControl;

  public hideKey: boolean;
  public isloading: boolean;
  public loggedIn: boolean;
  public loginMissmatch: boolean;
  public loginNotValid: boolean;

  public loggedInWithLedger: boolean;
  public loginLedgerMissmatch: boolean;
  public loginLedgerNotValid: boolean;

  public isAccountActive: boolean;

  public LedgerappVersion;
  public LedgerApi;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private user: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private stellarService: StellarService
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    const uid = this.auth.getCurrentUserId();

    this.isloading = false;
    this.hideKey = false;
    this.loginYourKey = false;
    this.automatically = true;
    this.loggedInWithLedger = false;
    this.loggedIn = false;
    this.loginMissmatch = false;
    this.loginNotValid = false;
    this.isAccountActive = false;

    this.LedgerApi = null;
    this.LedgerappVersion = null;

    this.user.getUserById(uid).subscribe(
      res => {
        this.currentUser = res;
        this.keypair.public = res.receiving_wallet_address;
        this.getTrustline(res.id);
        console.log('user', res);
      },
      err => {
        console.log('error get user', err);
      }
    );

    this.keypairForm = this.fb.group({
      agreement1: [false, Validators.requiredTrue],
      agreement2: [false, Validators.requiredTrue],
      agreement3: [false, Validators.requiredTrue],
      agreement4: [false, Validators.requiredTrue],
      agreement5: [false, Validators.requiredTrue],
    });

    this.inputSecretKeyLogin = new FormControl('', [Validators.required]);
    this.loginAgreement = new FormControl(false, [Validators.requiredTrue]);
    this.createTrustlineAgreement = new FormControl(false, [Validators.requiredTrue]);
    this.createTrustlineAgreementLedger = new FormControl(false, [Validators.requiredTrue]);
  }

  getTrustline(id) {
    if (this.currentUser.receiving_wallet_address) {
      this.keypairForm.controls.agreement1.disable();
      this.keypairForm.controls.agreement2.disable();
      this.keypairForm.controls.agreement3.disable();
      this.keypairForm.controls.agreement4.disable();
      this.keypairForm.controls.agreement5.disable();
      this.user.getUserTrustline().subscribe(
        (res: any) => {
          if (res.result === 'trusted') {
            this.walletTrusted = true;
            console.log('trusted');
          } else {
            this.walletTrusted = false;
            console.log('not-trusted');
          }
        },
        err => {
          if (err.error.error === 'address_not_found') {
            this.walletTrusted = false;
            console.log('not-trusted');
          } else {
            console.log('trust line error', err);
          }
        }
      );
    } else {
      this.walletTrusted = false;
    }
  }

  onSignOut() {
    this.auth.signOut();
  }

  generateKeypair() {
    if (this.keypairForm.valid) {
      const dialogKeypairConfirmation = this.dialog.open(KeypairConfirmationComponent, {
        disableClose: true,
      });

      dialogKeypairConfirmation.afterClosed().subscribe(r => {
        if (r) {
          this.dialog.open(KeypairLoadingComponent, {
            disableClose: true,
          });

          this.isloading = true;
          this.user.generateKeypair().subscribe(
            (res: any) => {
              this.currentUser.receiving_wallet_address = res.public;
              this.keypair = {
                secret: res.secret,
                public: res.public,
              };
              this.initData();
              this.dialog.closeAll();
              this.showKeypair();
              console.log('res', res);
            },
            err => {
              this.initData();
              this.dialog.closeAll();
              this.isloading = false;
              console.log('error generating keypair', err);
            }
          );
        } else {
          this.initData();
        }
      });
    }
  }

  showKeypair() {
    const dialogRef = this.dialog.open(KeypairResultComponent, {
      data: {
        keypair: this.keypair,
      },
      disableClose: true,
    });
  }

  getBalance(publicKey) {
    return this.stellarService.getAccount(publicKey).subscribe(
      account => {
        console.log('account', account);
        if (account['balances'] && account['balances'] === 'none') {
          console.log('account not activated');
          this.isAccountActive = false;
          this.isloading = false;
          this.dialog.closeAll();
          return;
        } else {
          console.log(account['balances'].length);
          this.isAccountActive = true;
          this.isloading = false;
          this.dialog.closeAll();
        }
        return;
      },
      error => {
        this.isloading = false;
        this.dialog.closeAll();
        this.snackBar.open('Something went wrong', 'Close', {
          duration: 5000,
        });
        console.log('error getBalance', error);
        return;
      }
    );
  }

  loginWithSecretKey() {
    const secretKey = this.inputSecretKeyLogin.value;

    this.dialog.open(SecretKeyLoadingComponent, {
      disableClose: true,
    });
    this.isloading = true;

    if (this.stellarService.validateKey(secretKey) === false) {
      this.isloading = false;
      this.dialog.closeAll();
      this.loginNotValid = true;
      this.loginMissmatch = false;
    } else {
      this.stellarService.getPublicKey(secretKey).subscribe(
        (data: any) => {
          if (
            (this.currentUser.receiving_wallet_address === data && this.currentUser.receiving_wallet_address) ||
            !this.currentUser.receiving_wallet_address
          ) {
            this.getTrustline(this.currentUser.id);
            this.keypair = {
              secret: secretKey,
              public: data,
            };
            this.loginMissmatch = false;
            this.loginNotValid = false;
            this.loggedIn = true;
            console.log('already logged in', data);

            return this.getBalance(data);
          } else {
            this.loginMissmatch = true;
            this.loginNotValid = false;
            this.loggedIn = false;
            this.dialog.closeAll();
            this.isloading = false;

            console.log('not match');
          }
        },
        (error: any) => {
          this.isloading = false;
          this.dialog.closeAll();
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 5000,
          });
          console.log('error getpublickey', error);
        }
      );
    }
  }

  createTrustline() {
    if (this.createTrustlineAgreement.valid) {
      const dialogTrustlineConfirmation = this.dialog.open(TrustlineConfirmationComponent, {
        disableClose: true,
      });

      dialogTrustlineConfirmation.afterClosed().subscribe(r => {
        if (r) {
          this.dialog.open(TrustlineLoadingComponent, {
            disableClose: true,
          });

          this.isloading = true;

          Observable.of(this.currentUser.receiving_wallet_address)
            .switchMap(isAddressSet => {
              console.log('isAddressSet', isAddressSet);
              if (isAddressSet) {
                return Observable.of(null);
              } else {
                console.log('updateUserAddress', this.keypair.public);
                return this.user.updateUserAddress({ address: this.keypair.public }, 'receiving');
              }
            })
            .switchMap(res => {
              console.log('isAccountActive', this.isAccountActive);
              if (this.isAccountActive) {
                return Observable.of(null);
              } else {
                console.log('fundLumens');
                return this.user.fundLumens(this.keypair.public);
              }
            })
            .switchMap(res => this.stellarService.createTrust(this.keypair.secret))
            .subscribe(
              res => {
                this.isloading = false;
                this.initData();
                this.dialog.closeAll();
                this.dialog.open(TrustlineResultComponent, {
                  disableClose: true,
                });
                this.getTrustline(this.currentUser.id);
              },
              error => {
                this.initData();

                let eMsg = 'There was an error enabling trust now, please try again later';
                if (error.error.error === 'addr_exist') {
                  eMsg = 'Address is already in used, please use another address';
                }
                this.isloading = false;
                this.dialog.closeAll();
                this.snackBar.open(eMsg, 'Close', {
                  duration: 5000,
                });
                console.log('error creating trusltine', error);
              }
            );
        } else {
          this.initData();
        }
      });
    }
  }

  ledgerOpen() {
    const openTimeout = 30 * 1000;
    const exchangeTimeout = 30 * 1000;

    return LedgerTransport.isSupported()
      .then(isSupported => {
        console.log('aba', isSupported);
        if (isSupported) {
          return LedgerTransport.create(openTimeout);
        } else {
          throw new Error('Not Supported');
        }
      })
      .then(transport => {
        console.log('asdfasdf', transport);
        // transport.setDebugMode(true);
        transport.setExchangeTimeout(exchangeTimeout);
        this.LedgerApi = new LedgerStellar(transport);
        return this.LedgerApi;
      });
  }

  ledgerConnect() {
    if (this.LedgerApi === null) {
      console.log('open ledger');
      return this.ledgerOpen().then(api => {
        console.log('ledger opened');
        return api.getAppConfiguration().then(result => {
          console.log('ledger config', result);
          this.LedgerappVersion = result.version;
          return api;
        });
      });
    } else {
      return Promise.resolve(this.LedgerApi);
    }
  }

  getLedgerPublicKey(): Promise<any> {
    // tslint:disable-next-line:quotemark
    const bip32Path = "44'/148'/0'";
    const verifyKeyPair = true;
    const confirmAddress = false;
    return this.ledgerConnect().then(api => {
      return api.getPublicKey(bip32Path, verifyKeyPair, confirmAddress).then(result => {
        return result.publicKey;
      });
    });
  }

  getLedgerSignature(transaction): Promise<any> {
    // tslint:disable-next-line:quotemark
    const bip32Path = "44'/148'/0'";
    return this.ledgerConnect().then(api => {
      return api.signTransaction(bip32Path, transaction.signatureBase()).then(result => {
        console.log('found', result);
        return result.signature;
      });
    });
  }

  loginNanoLedger() {
    this.dialog.open(SecretKeyLoadingComponent, {
      disableClose: true,
    });
    this.isloading = true;

    this.getLedgerPublicKey().then(
      (data: any) => {
        console.log('res', data);

        if (
          (this.currentUser.receiving_wallet_address === data && this.currentUser.receiving_wallet_address) ||
          !this.currentUser.receiving_wallet_address
        ) {
          this.getTrustline(this.currentUser.id);
          this.keypair.public = data;
          this.loginLedgerMissmatch = false;
          this.loginLedgerNotValid = false;
          this.loggedInWithLedger = true;
          console.log('already logged in', data);

          return this.getBalance(data);
        } else {
          this.loginLedgerMissmatch = true;
          this.loginLedgerNotValid = false;
          this.loggedInWithLedger = false;
          this.dialog.closeAll();
          this.isloading = false;

          console.log('not match');
        }
      },
      (error: any) => {
        console.log('error getpublickey', error);
        this.isloading = false;
        this.loginLedgerNotValid = true;
        this.loginLedgerMissmatch = false;
        this.dialog.closeAll();
        // this.snackBar.open('Something went wrong', null, {
        //   duration: 5000,
        // });
      }
    );
  }

  createTrustlineLedger() {
    if (this.createTrustlineAgreementLedger.valid) {
      const dialogTrustlineConfirmation = this.dialog.open(TrustlineConfirmationComponent, {
        disableClose: true,
      });

      dialogTrustlineConfirmation.afterClosed().subscribe(r => {
        if (r) {
          this.dialog.open(TrustlineLoadingComponent, {
            disableClose: true,
          });

          this.isloading = true;

          Observable.of(this.currentUser.receiving_wallet_address)
            .switchMap(isAddressSet => {
              console.log('isAddressSet', isAddressSet);
              if (isAddressSet) {
                return Observable.of(null);
              } else {
                console.log('updateUserAddress', this.keypair.public);
                return this.user.updateUserAddress({ address: this.keypair.public }, 'receiving');
              }
            })
            .switchMap(res => {
              console.log('isAccountActive', this.isAccountActive);
              if (this.isAccountActive) {
                return Observable.of(null);
              } else {
                console.log('fundLumens');
                return this.user.fundLumens(this.keypair.public);
              }
            })
            .switchMap(res => this.stellarService.createTrustForLedger(this.keypair.public))
            .switchMap(trans => {
              return Observable.fromPromise(this.getLedgerSignature(trans)).switchMap(signature =>
                this.stellarService.submitTrustlineForLedger(trans, signature, this.keypair.public)
              );
            })
            .subscribe(
              res => {
                console.log('success', res);
                this.isloading = false;
                this.initData();
                this.dialog.closeAll();
                this.dialog.open(TrustlineResultComponent, {
                  disableClose: true,
                });
              },
              err => {
                console.log('error create trusltine', err);

                let eMsg = 'There was an error enabling trust now, please try again later';

                if (err.error ? err.error.error === 'addr_exist' : false) {
                  eMsg = 'Address is already in used, please use another address';
                } else if (err.message) {
                  eMsg = err.message;
                }
                this.initData();
                this.isloading = false;
                this.dialog.closeAll();
                this.snackBar.open(eMsg, 'Close', {
                  duration: 5000,
                });
              }
            );
        } else {
          this.initData();
        }
      });
    }
  }
}
