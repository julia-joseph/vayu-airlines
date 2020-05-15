import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { WellnessKitDetailsService } from '../../../services/wellness-kit-details/wellness-kit-details.service';
export interface DialogData {
  flightCode: string;
  maskQuantity: number;
  maskSize: number;
  maskPrice: number;
  sanitizerQuantity: number;
  sanitizerSize: number;
  sanitizerPrice: number;
  glovesQuantity: number;
  glovesSize: number;
  glovesPrice: number;
  delivery: string;
  segment: string;
  additionalItems: any[];
  totalPrice: number;
}

@Component({
  selector: 'app-ancillaries-dialog',
  templateUrl: './ancillaries-dialog.component.html',
  styleUrls: ['./ancillaries-dialog.component.scss'],
})
export class AncillariesDialogComponent implements OnInit {
  totalKitQty: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AncillariesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private wellnessKitService: WellnessKitDetailsService
  ) {}

  ngOnInit(): void {
  }

  onEdit() {
    //stay
    this.dialogRef.close();
  }

  onContinue() {
    let itemsQty = 0;
    this.data.additionalItems.forEach(e => {
      itemsQty = itemsQty + e.quantity;
    })
    this.totalKitQty =
      this.data.maskQuantity +
      this.data.sanitizerQuantity +
      this.data.glovesQuantity +
      itemsQty;
    this.wellnessKitService.setTotalPrice(this.data.totalPrice);
    this.wellnessKitService.settotalKitQty(this.totalKitQty);
    //navigate to booking details
    this.dialogRef.close('Continue');
  }
}
