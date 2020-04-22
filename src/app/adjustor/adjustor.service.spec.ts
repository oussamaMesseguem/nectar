import { TestBed } from '@angular/core/testing';

import { AdjustorService } from './adjustor.service';

describe('AdjustorService', () => {
  let service: AdjustorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjustorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
