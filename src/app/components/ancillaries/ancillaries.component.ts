import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-ancillaries',
  templateUrl: './ancillaries.component.html',
  styleUrls: ['./ancillaries.component.scss'],
})
export class AncillariesComponent implements OnInit {
  @Input() fromCode: string = 'JFK';
  @Input() toCode: string = 'BOS';
  @Output() onSubmit = new EventEmitter<void>();
  selectedTab = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitOfWellnessKit() {
    // this.selectedTab = 1;
    this.onSubmit.emit();
  }

  onSkipToDigitalIFE() {
    this.selectedTab = 1;
  }

  onSubmitOfDigitalIfe() {
    // this.selectedTab = 2;
    this.onSubmit.emit();
  }

  onSkipToSeatRegrouping() {
    this.selectedTab = 2;
  }

  onSubmitOfAdjacentSeat() {
    // this.selectedTab = 3;
    this.onSubmit.emit();
  }  
}
