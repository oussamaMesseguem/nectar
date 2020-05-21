import { TestBed } from '@angular/core/testing';

import { MiddlewareService } from './middleware.service';
import { HttpClient } from '@angular/common/http';

describe('MiddlewareService', () => {
  let service: MiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: {} },
      ]
    });
    service = TestBed.inject(MiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
