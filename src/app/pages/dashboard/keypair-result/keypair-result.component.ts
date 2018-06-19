import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-keypair-result',
  templateUrl: './keypair-result.component.html',
  styleUrls: ['./keypair-result.component.scss'],
})
export class KeypairResultComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<KeypairResultComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
