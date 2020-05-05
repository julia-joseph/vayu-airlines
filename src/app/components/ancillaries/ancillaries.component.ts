import { Component, OnInit } from '@angular/core';
import { AncillariesDialogComponent } from './ancillaries-dialog/ancillaries-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ancillaries',
  templateUrl: './ancillaries.component.html',
  styleUrls: ['./ancillaries.component.scss']
})
export class AncillariesComponent implements OnInit {
  deliveryLocations: string[] = [
    'Gate',
    'Lounge'
  ];

  maskQuantity: number = 2;
  maskPrice: number = 5.24;
  maskSize:string = 'Adult';
  sanitizerQuantity: number = 1;
  sanitizerPrice: number = 2.30;
  sanitizerSize:string = '1 Oz';
  glovesQuantity: number = 1;
  glovesPrice: number = 1.20;
  glovesSize: string = 'Adult';
  delivery: string = 'Gate';
  
  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCancel() {

  }

  onConfirm() {
    const dialogRef = this.dialog.open(AncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px',
      data: {
        flightCode: 'YYZ-LGA',
        maskQuantity: this.maskQuantity,
        maskSize: this.maskSize,
        maskPrice: this.maskPrice,
        sanitizerQuantity: this.sanitizerQuantity,
        sanitizerSize: this.sanitizerSize,
        sanitizerPrice: this.sanitizerPrice,
        glovesQuantity: this.glovesQuantity,
        glovesSize: this.glovesSize,
        glovesPrice: this.glovesPrice,
        delivery: this.delivery
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/itinerary-confirmation']);
      }
    });
  }

}
