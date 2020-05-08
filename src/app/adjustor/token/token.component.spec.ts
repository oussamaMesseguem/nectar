import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import { AdjustorService } from '../adjustor.service';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs';

describe('Adjustor TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;
  let spyService: jasmine.SpyObj<AdjustorService>;

  beforeEach(async(() => {
    const adjustorServiceStub = jasmine.createSpyObj('AdjustorService',
      ['duplicateToken', 'newTokenBefore', 'newTokenAfter', 'editToken', 'deleteToken']);

    TestBed.configureTestingModule({
      imports: [MatMenuModule, BrowserAnimationsModule],
      providers: [{ provide: AdjustorService, useValue: adjustorServiceStub }],
      declarations: [TokenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    spyService = TestBed.inject(AdjustorService) as jasmine.SpyObj<AdjustorService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set inputs at init', () => {
    expect(component.token).toBeUndefined('token input should be undefined before detectChanges');
    component.token = { token: 'test' };
    component.itoken = 3;
    expect(component.token.token).toEqual('test', 'token input should be set after detectChanges');
  });

  it('should call duplicateToken when duplicate button is clicked', () => {
    component.itoken = 3;
    component.duplicate();
    expect(spyService.duplicateToken).toHaveBeenCalledWith(3);
  });

  it('should call newTokenBefore when duplicate button is clicked', () => {
    component.itoken = 3;
    component.newBefore();
    expect(spyService.newTokenBefore).toHaveBeenCalledWith(3);
  });

  it('should call newTokenAfter when duplicate button is clicked', () => {
    component.itoken = 3;
    component.newAfter();
    expect(spyService.newTokenAfter).toHaveBeenCalledWith(3);
  });

  it('should call editToken when duplicate button is clicked', () => {
    component.itoken = 3;
    component.token = { token: 'value' };
    component.subscription = new Subscription();
    component.edit();
    expect(spyService.editToken).toHaveBeenCalledWith(3, 'value');
  });

  it('should call deleteToken when duplicate button is clicked', () => {
    component.itoken = 3;
    component.delete();
    expect(spyService.deleteToken).toHaveBeenCalledWith(3);
  });
});
