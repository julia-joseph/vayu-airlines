import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedAncillariesDialogComponent } from './expanded-ancillaries-dialog.component';

describe('ExpandedAncillariesDialogComponent', () => {
  let component: ExpandedAncillariesDialogComponent;
  let fixture: ComponentFixture<ExpandedAncillariesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedAncillariesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedAncillariesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
