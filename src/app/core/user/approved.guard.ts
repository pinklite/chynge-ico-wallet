import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { KycStatus } from './user-model';

@Injectable()
export class ApprovedGuard implements CanActivate {
  constructor(private auth: AuthService, private user: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const uid = this.auth.getCurrentUserId();

    if (uid) {
      return this.user.getUserById(uid).map(res => {
        if (res.kyc_status === 'Approved') {
          return true;
        } else {
          this.router.navigate(['/kyc-not-approved']);
        }
      });
    } else {
      return Observable.of(false);
    }
  }
}
