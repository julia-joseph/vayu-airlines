import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss']
})
export class RecentEventsComponent implements OnInit {
  events: any[] = [
    {
      img: '',
      title: 'International Hunger Relief 2020',
      date: 'May 21, 2020'
    },
    {
      img: '',
      title: '#Stronger Together: Better Than Ever',
      date: 'May 12, 2020'
    },
    {
      img: '',
      title: 'COVID-19: We Are In This Together!',
      date: 'April 19, 2020'
    },
    {
      img: '',
      title: 'Stay Informed about COVID-19',
      date: 'March 31, 2020'
    },
    {
      img: '',
      title: 'You Can Save A Life!',
      date: 'March 17, 2020'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
