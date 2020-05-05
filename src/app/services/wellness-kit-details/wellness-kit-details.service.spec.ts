import { TestBed } from '@angular/core/testing';

import { WellnessKitDetailsService } from './wellness-kit-details.service';

describe('WellnessKitDetailsService', () => {
  let service: WellnessKitDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellnessKitDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
