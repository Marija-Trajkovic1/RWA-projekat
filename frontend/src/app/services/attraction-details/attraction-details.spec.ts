import { TestBed } from '@angular/core/testing';

import { AttractionDetailsService } from './attraction-details.service';

describe('AttractionDetails', () => {
  let service: AttractionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttractionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
