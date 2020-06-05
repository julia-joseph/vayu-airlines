import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessDonationComponent } from './wellness-donation.component';

describe('WellnessDonationComponent', () => {
  let component: WellnessDonationComponent;
  let fixture: ComponentFixture<WellnessDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnessDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
