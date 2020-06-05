import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adjacent-subscription',
  templateUrl: './adjacent-subscription.component.html',
  styleUrls: ['./adjacent-subscription.component.scss']
})
export class AdjacentSubscriptionComponent implements OnInit {
  @Input() adjacentSub;
  constructor() { }

  ngOnInit(): void {
  }

}
