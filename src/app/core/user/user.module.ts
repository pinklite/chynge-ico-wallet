import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service';
import { ApprovedGuard } from './approved.guard';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [UserService, ApprovedGuard],
})
export class UserModule {}
