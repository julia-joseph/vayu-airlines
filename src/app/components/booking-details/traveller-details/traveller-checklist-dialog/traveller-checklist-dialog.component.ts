import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  disableAgree: boolean
}

@Component({
  selector: 'app-traveller-checklist-dialog',
  templateUrl: './traveller-checklist-dialog.component.html',
  styleUrls: ['./traveller-checklist-dialog.component.scss']
})
export class TravellerChecklistDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TravellerChecklistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onContinue() {
    this.dialogRef.close(true);
  }
}
