import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

const sessionInformation = {
  token: 'string',
  type: 'string',
  id: 1,
  username: 'string',
  firstName: 'string',
  lastName: 'string',
  admin: true,
}

const authServiceMock = {
  login: jest.fn(() => of(sessionInformation)),
}

const sessionServiceMock = {
  logIn : jest.fn((response) => null)
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: AuthService, useValue: authServiceMock }, // added to mock authservice
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Login')
  })

  it('Submit error', () => {
    const compiled = fixture.nativeElement as HTMLElement

    authServiceMock.login.mockReturnValueOnce(throwError('error'));

    const form2 = fixture.debugElement.query(By.css('.login-form'))
    const submitFn = jest.spyOn(component, 'submit')
    form2.triggerEventHandler('submit', null)
    expect(submitFn).toHaveBeenCalled()
    expect(authServiceMock.login).toHaveBeenCalled();
    expect(component.onError).toBe(true);
  })

  it('Submit', () => {
    const compiled = fixture.nativeElement as HTMLElement

    const form2 = fixture.debugElement.query(By.css('.login-form'))
    const submitFn = jest.spyOn(component, 'submit')
    form2.triggerEventHandler('submit', null)
    expect(submitFn).toHaveBeenCalled()
    expect(authServiceMock.login).toHaveBeenCalled();
    expect(sessionServiceMock.logIn).toHaveBeenCalledWith(sessionInformation);
  })


})
