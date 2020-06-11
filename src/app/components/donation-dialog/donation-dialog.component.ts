import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  //if data is to be passed specify here
}

@Component({
  selector: 'app-donation-dialog',
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.scss']
})
export class DonationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DonationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close(false)
  }
  
  onContinue() {
    this.dialogRef.close(true);
  }

}
