import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { IdleService } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private idle: IdleService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.signOut();
    }

    if (this.idle.isIdle()) {
      console.log('signing out due to inactivity');
      this.auth.signOut();
    }

    console.log('auth guard check', `is auth: ${this.auth.isAuthenticated()}`, `is idle: ${this.idle.isIdle()}`);
    return this.auth.isAuthenticated() && !this.idle.isIdle();
  }
}
