import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AncillariesDialogComponent } from './ancillaries-dialog/ancillaries-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';

@Component({
  selector: 'app-ancillaries',
  templateUrl: './ancillaries.component.html',
  styleUrls: ['./ancillaries.component.scss'],
})
export class AncillariesComponent implements OnInit {
  @Input() fromCode: string = 'NYC';
  @Input() toCode: string = 'LAX';
  @Output() onSubmit = new EventEmitter<void>();
  deliveryLocations: string[] = ['Gate','Lounge','In flight','Check-In'];
  segmentOptions: string[] = ['YYZ - LGA'];

  maskQuantity: number = 1;
  maskPrice: number = 5.24;
  maskSize: string = 'Adult';
  sanitizerQuantity: number = 1;
  sanitizerPrice: number = 2.3;
  sanitizerSize: string = '1 Oz';
  glovesQuantity: number = 1;
  glovesPrice: number = 1.2;
  glovesSize: string = 'Adult';
  delivery: string = 'Gate';
  submitted: boolean = false;
  segment: string = 'YYZ - LGA';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService
  ) {}

  ngOnInit(): void {
    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [
      this.segment
    ]
  }

  onCancel() {}

  onConfirm() {
    const dialogRef = this.dialog.open(AncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '700px',
      data: {
        flightCode: this.fromCode + ' - ' + this.toCode,
        maskQuantity: this.maskQuantity,
        maskSize: this.maskSize,
        maskPrice: this.maskPrice,
        sanitizerQuantity: this.sanitizerQuantity,
        sanitizerSize: this.sanitizerSize,
        sanitizerPrice: this.sanitizerPrice,
        glovesQuantity: this.glovesQuantity,
        glovesSize: this.glovesSize,
        glovesPrice: this.glovesPrice,
        delivery: this.delivery,
        segment: this.segment,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.wellnessKitService.setWellnessKitDetails({
          maskQuantity: this.maskQuantity,
          maskPrice: 5.24,
          maskSize: this.maskSize,
          sanitizerQuantity: this.sanitizerQuantity,
          sanitizerPrice: 2.30,
          sanitizerSize: this.sanitizerSize,
          glovesQuantity: this.glovesQuantity,
          glovesPrice: 1.20,
          glovesSize: this.glovesSize,
          delivery: this.delivery,
          segment: this.segment
        })
        
        //disable select buttons
        this.submitted = true;

        this.onSubmit.emit();
        //don't nagivate - enable payment button
        //this.router.navigate(['/itinerary-confirmation']);
      }
    });
  }
}
