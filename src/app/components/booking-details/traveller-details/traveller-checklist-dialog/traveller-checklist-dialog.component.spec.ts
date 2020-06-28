import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerChecklistDialogComponent } from './traveller-checklist-dialog.component';

describe('TravellerChecklistDialogComponent', () => {
  let component: TravellerChecklistDialogComponent;
  let fixture: ComponentFixture<TravellerChecklistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerChecklistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerChecklistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
