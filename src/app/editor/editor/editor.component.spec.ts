import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { StoreService } from 'src/app/store/store.service';
import { MatMenuModule } from '@angular/material/menu';

describe('EditorComponent', () => {
  let service: StoreService;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      imports: [ MatDialogModule, MatMenuModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: StoreService, useValue: {} },
    ]
    })
    .compileComponents();
    service = TestBed.inject(StoreService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    // Needed when fixture.detectChanges() is called as getters are executed.
    // spyOnProperty(component, 'filteredAnnotations').and.callFake(() => []);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
