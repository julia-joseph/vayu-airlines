import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessKitComponent } from './wellness-kit.component';

describe('WellnessKitComponent', () => {
  let component: WellnessKitComponent;
  let fixture: ComponentFixture<WellnessKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnessKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
