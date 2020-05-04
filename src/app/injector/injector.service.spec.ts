import { TestBed } from '@angular/core/testing';

import { InjectorService } from './injector.service';
import { StoreService } from '../store/store.service';
import { HttpClient } from '@angular/common/http';

describe('InjectionService', () => {
  let service: InjectorService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('StoreService', ['dummy']);
    TestBed.configureTestingModule({
      providers: [
        InjectorService,
        { provide: StoreService, useValue: storeSpy },
        { provide: HttpClient, useValue: {} },
      ]
    });
    service = TestBed.inject(InjectorService);
    storeServiceSpy = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
