import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalIFEComponent } from './digital-ife.component';

describe('DigitalIFEComponent', () => {
  let component: DigitalIFEComponent;
  let fixture: ComponentFixture<DigitalIFEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalIFEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalIFEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
