import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';
import { UtilsModule } from './utils';
import { StellarModule } from './stellar/stellar.module';

@NgModule({
  imports: [HttpClientModule, BrowserAnimationsModule, AuthModule, UserModule, AwsModule, UtilsModule, StellarModule],
  providers: [],
})
export class CoreModule {}
