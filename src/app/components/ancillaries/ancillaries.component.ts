import { Component, OnInit } from '@angular/core';
import { AncillariesDialogComponent } from './ancillaries-dialog/ancillaries-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';

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
  submitted: boolean = false;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService
  ) { }

  ngOnInit(): void {
  }

  onCancel() {

  }

  onConfirm() {
    const dialogRef = this.dialog.open(AncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '700px',
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

        this.wellnessKitService.setWellnessKitDetails({
          maskQuantity: this.maskQuantity,
          maskPrice: 5.24,
          sanitizerQuantity: this.sanitizerQuantity,
          sanitizerPrice: 2.30,
          glovesQuantity: this.glovesQuantity,
          glovesPrice: 1.20,
          delivery: this.delivery
        })
        
        //disable select buttons
        this.submitted = true;
        //don't nagivate - enable payment button
        //this.router.navigate(['/itinerary-confirmation']);
      }
    });
  }

}
