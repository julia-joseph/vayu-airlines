import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedDigitalIFEComponent } from './expanded-digital-ife.component';

describe('ExpandedDigitalIFEComponent', () => {
  let component: ExpandedDigitalIFEComponent;
  let fixture: ComponentFixture<ExpandedDigitalIFEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedDigitalIFEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedDigitalIFEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
