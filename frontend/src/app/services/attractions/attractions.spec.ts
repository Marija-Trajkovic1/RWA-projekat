import { TestBed } from '@angular/core/testing';

import { Attractions } from './attractions.service';

describe('Attractions', () => {
  let service: Attractions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Attractions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
