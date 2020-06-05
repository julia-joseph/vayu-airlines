import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefFundsComponent } from './relief-funds.component';

describe('ReliefFundsComponent', () => {
  let component: ReliefFundsComponent;
  let fixture: ComponentFixture<ReliefFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReliefFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReliefFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
