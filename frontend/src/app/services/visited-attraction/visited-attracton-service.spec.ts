import { TestBed } from '@angular/core/testing';

import { VisitedAttractonService } from '../../services/visited-attraction/visited-attracton.service'

describe('VisitedAttractonService', () => {
  let service: VisitedAttractonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitedAttractonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
