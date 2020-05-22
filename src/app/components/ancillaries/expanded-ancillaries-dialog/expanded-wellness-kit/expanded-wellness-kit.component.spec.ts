import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedWellnessKitComponent } from './expanded-wellness-kit.component';

describe('ExpandedWellnessKitComponent', () => {
  let component: ExpandedWellnessKitComponent;
  let fixture: ComponentFixture<ExpandedWellnessKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedWellnessKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedWellnessKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
