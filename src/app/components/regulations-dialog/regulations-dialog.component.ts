import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  //if data is to be passed specify here
}

@Component({
  selector: 'app-regulations-dialog',
  templateUrl: './regulations-dialog.component.html',
  styleUrls: ['./regulations-dialog.component.scss']
})
export class RegulationsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegulationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
