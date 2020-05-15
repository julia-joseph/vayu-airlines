import { Component, OnInit } from '@angular/core';
import { RegulationsDialogComponent } from '../regulations-dialog/regulations-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.openRegulationsDialog();
  }

  openRegulationsDialog(): void {
    const dialogRef = this.dialog.open(RegulationsDialogComponent, {
      panelClass: 'regulation-dialog-container',
      height: '80vh',
      width: '200vh',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
