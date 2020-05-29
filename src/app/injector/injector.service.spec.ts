import { TestBed } from '@angular/core/testing';

import { InjectorService } from './injector.service';
import { StoreService } from '../store/store.service';
import { HttpClient } from '@angular/common/http';
import { MiddlewareService } from '../middleware/middleware.service';

describe('InjectionService', () => {
  let service: InjectorService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;
  let middleServiceSpy: jasmine.SpyObj<MiddlewareService>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('StoreService', ['dummy']);
    const middlewareSpy = jasmine.createSpyObj('MiddlewareService', ['dummy']);
    TestBed.configureTestingModule({
      providers: [
        InjectorService,
        { provide: StoreService, useValue: storeSpy },
        { provide: MiddlewareService, useValue: middlewareSpy }
      ]
    });
    service = TestBed.inject(InjectorService);
    storeServiceSpy = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    middleServiceSpy = TestBed.inject(MiddlewareService) as jasmine.SpyObj<MiddlewareService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
