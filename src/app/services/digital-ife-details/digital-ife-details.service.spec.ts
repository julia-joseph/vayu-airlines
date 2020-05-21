import { TestBed } from '@angular/core/testing';

import { DigitalIfeDetailsService } from './digital-ife-details.service';

describe('DigitalIfeDetailsService', () => {
  let service: DigitalIfeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalIfeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
