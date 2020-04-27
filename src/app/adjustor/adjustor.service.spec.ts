import { TestBed } from '@angular/core/testing';

import { AdjustorService } from './adjustor.service';
import { StoreService } from '../store.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdjustorService', () => {
  let service: AdjustorService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('StoreService', ['dummy']);
    TestBed.configureTestingModule({
      imports: [ MatDialogModule],
      providers: [
        AdjustorService,
        { provide: StoreService, useValue: storeSpy }
      ]
    });
    service = TestBed.inject(AdjustorService);
    storeServiceSpy = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
