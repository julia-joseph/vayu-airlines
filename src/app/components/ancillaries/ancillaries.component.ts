import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TravellerService } from 'src/app/services/traveller--details/traveller.service';
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

  travellerDetails: any;

  constructor(
    private travellerService: TravellerService
  ) { }

  ngOnInit(): void {
    this.travellerService.getTravellerDetailsPObservable().subscribe(details => {
      if(details.firstName){
        this.travellerDetails = details;
      }
      else {
        this.travellerDetails = null;
      }
    })
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
