import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth';
import { ApprovedGuard } from './core/user';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { KycNotApprovedComponent } from './pages/kyc-not-approved/kyc-not-approved.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'kyc-not-approved', component: KycNotApprovedComponent },
  {
    path: '',
    canActivate: [AuthGuard, ApprovedGuard],
    component: DashboardComponent,
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
