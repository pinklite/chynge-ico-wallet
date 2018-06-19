import { Component, OnInit } from '@angular/core';
import { UserService, User, KycStatus } from '../../core/user';
import { AuthService } from '../../core/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-not-approved',
  templateUrl: './kyc-not-approved.component.html',
  styleUrls: ['./kyc-not-approved.component.scss'],
})
export class KycNotApprovedComponent implements OnInit {
  public kycStatus;

  constructor(private user: UserService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const uid = this.auth.getCurrentUserId();

    this.user.getUserById(uid).subscribe(
      res => {
        this.kycStatus = res.kyc_status;
        console.log('user', res);
        if (this.kycStatus === 'Approved') {
          this.auth.signOut();
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }
}
