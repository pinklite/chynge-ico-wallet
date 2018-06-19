import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ErrorComponent } from './pages/error/error.component';
import { KycNotApprovedComponent } from './pages/kyc-not-approved/kyc-not-approved.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ForgotPasswordComponent, ErrorComponent, KycNotApprovedComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, DashboardModule, SharedModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
