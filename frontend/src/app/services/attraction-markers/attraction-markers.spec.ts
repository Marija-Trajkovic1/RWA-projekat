import { TestBed } from '@angular/core/testing';

import { AttractionMarkers } from '../attraction-markers';

describe('AttractionMarkers', () => {
  let service: AttractionMarkers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttractionMarkers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
