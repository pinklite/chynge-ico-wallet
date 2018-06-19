import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { KeypairResultComponent } from './keypair-result/keypair-result.component';
import { KeypairLoadingComponent } from './keypair-loading/keypair-loading.component';
import { SecretKeyLoadingComponent } from './secret-key-loading/secret-key-loading.component';
import { KeypairConfirmationComponent } from './keypair-confirmation/keypair-confirmation.component';
import { TrustlineLoadingComponent } from './trustline-loading/trustline-loading.component';
import { TrustlineConfirmationComponent } from './trustline-confirmation/trustline-confirmation.component';
import { TrustlineResultComponent } from './trustline-result/trustline-result.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    DashboardComponent,
    KeypairResultComponent,
    KeypairLoadingComponent,
    SecretKeyLoadingComponent,
    KeypairConfirmationComponent,
    TrustlineLoadingComponent,
    TrustlineConfirmationComponent,
    TrustlineResultComponent,
  ],
  entryComponents: [
    KeypairLoadingComponent,
    KeypairResultComponent,
    SecretKeyLoadingComponent,
    KeypairConfirmationComponent,
    TrustlineLoadingComponent,
    TrustlineConfirmationComponent,
    TrustlineResultComponent,
  ],
})
export class DashboardModule {}
