import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as jwtDecode from 'jwt-decode';

import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm: FormGroup;
  public confirmForm: FormGroup;
  public hidePassword = true;
  public isloading: boolean;
  public showUnderline = false;

  public showConfirmForm = false;
  public showForgotForm = true;
  public resetSuccessful;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.confirmForm = this.fb.group({
      verificationCode: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onForgotSubmit() {
    if (this.forgotForm.valid) {
      this.isloading = true;
      const { email } = this.forgotForm.value;

      this.auth
        .forgotPassword(email)
        .then(() => {
          this.isloading = false;
          this.showConfirmForm = true;
          this.showForgotForm = false;
        })
        .catch(e => {
          this.isloading = false;
          console.log('err', e);

          if (e.message) {
            this.snackBar.open(e.message, null, {
              duration: 5000,
            });
          } else {
            this.snackBar.open('Something wrong, please try again later', null, {
              duration: 5000,
            });
          }
        });
    }
  }

  onConfirmSubmit() {
    if (this.confirmForm.valid) {
      this.isloading = true;
      const { verificationCode, newPassword } = this.confirmForm.value;
      this.auth
        .resetPassword(verificationCode, newPassword)
        .then(() => {
          this.isloading = false;
          this.showConfirmForm = false;
          this.resetSuccessful = true;
        })
        .catch(e => {
          this.isloading = false;
          console.log('err', e);

          if (e.message) {
            this.snackBar.open(e.message, null, {
              duration: 5000,
            });
          } else {
            this.snackBar.open('Something wrong, please try again later', null, {
              duration: 5000,
            });
          }
        });
    }
  }
}
