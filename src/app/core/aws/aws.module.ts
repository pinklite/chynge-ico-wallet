import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwsService } from './aws.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AwsService],
})
export class AwsModule {}
