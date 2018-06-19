import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as jwtDecode from 'jwt-decode';

import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public confirmForm: FormGroup;
  public hidePassword = true;
  public isloading: boolean;
  public showUnderline = false;
  public showConfirmForm = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.confirmForm = this.fb.group({
      code: ['', [Validators.required]],
    });

    if (this.auth.isAuthenticated()) {
      console.log('current user', this.auth.getCurrentUser());
    }
  }

  onSignIn() {
    if (this.form.valid) {
      this.isloading = true;
      const { email, password } = this.form.value;

      this.auth
        .authenticateUser({ username: email, password })
        .then(jwtPayload => {
          console.log('success', jwtPayload);

          window.location.replace('/');
        })
        .catch(e => {
          console.log('fail', e);
          this.isloading = false;
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
