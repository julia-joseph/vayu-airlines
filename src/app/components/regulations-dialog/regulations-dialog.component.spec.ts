import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationsDialogComponent } from './regulations-dialog.component';

describe('RegulationsDialogComponent', () => {
  let component: RegulationsDialogComponent;
  let fixture: ComponentFixture<RegulationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
