import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-trustline-result',
  templateUrl: './trustline-result.component.html',
  styleUrls: ['./trustline-result.component.scss'],
})
export class TrustlineResultComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<TrustlineResultComponent>) {}

  ngOnInit() {}
}
