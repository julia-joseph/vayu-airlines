import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncillariesDialogComponent } from './ancillaries-dialog.component';

describe('AncillariesDialogComponent', () => {
  let component: AncillariesDialogComponent;
  let fixture: ComponentFixture<AncillariesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncillariesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncillariesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
