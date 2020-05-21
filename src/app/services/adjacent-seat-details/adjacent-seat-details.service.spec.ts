import { TestBed } from '@angular/core/testing';

import { AdjacentSeatDetailsService } from './adjacent-seat-details.service';

describe('AdjacentSeatDetailsService', () => {
  let service: AdjacentSeatDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjacentSeatDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
