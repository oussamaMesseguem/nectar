import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjustorComponent } from './adjustor.component';
import { AdjustorService } from '../adjustor.service';
import { BehaviorSubject } from 'rxjs';

describe('AdjustorComponent', () => {
  let component: AdjustorComponent;
  let fixture: ComponentFixture<AdjustorComponent>;
  let spyService: jasmine.SpyObj<AdjustorService>;

  beforeEach(async(() => {
    const adjustorServiceStub = jasmine.createSpyObj('AdjustorService',
    ['getPreviousAndNextSentences']);
    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        { provide: AdjustorService, useValue: adjustorServiceStub }
      ],
      declarations: [ AdjustorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustorComponent);
    component = fixture.componentInstance;
    component.sentence$ = new BehaviorSubject([{ token: 'This' }, { token: 'is' }, { token: 'a' }, { token: 'test' }, { token: '.' }]);
    spyService = TestBed.inject(AdjustorService) as jasmine.SpyObj<AdjustorService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
