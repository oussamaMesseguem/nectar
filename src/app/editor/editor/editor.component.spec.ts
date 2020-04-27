import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { StoreService } from 'src/app/store.service';
import { MatMenuModule } from '@angular/material/menu';

describe('EditorComponent', () => {
  let service: StoreService;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let storeServiceStub: Partial<StoreService>;

  beforeEach(async(() => {
    storeServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      imports: [ MatDialogModule, MatMenuModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: StoreService, useValue: storeServiceStub },
    ]
    })
    .compileComponents();
    service = TestBed.inject(StoreService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
