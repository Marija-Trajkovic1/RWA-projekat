import { TestBed } from '@angular/core/testing';

import { SavedAttractionService } from './saved-attraction.service';

describe('SavedAttraction', () => {
  let service: SavedAttractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedAttractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
