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
import { Router } from '@angular/router';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

// Init mocks
const sessionInformation : SessionInformation = {
  token: `e85c9ffdaeff0bf290b2eebffd25ff56255d0a2c163edf229ebb83b189334962
  22724c1dd101ed52d9d88ea1c71eab235a7a4dbd380539b5e779373627460acc
  09193a12b1e67899ad9c16ebf95df5a5ba15e4ac2f546d4780283caecabc6bbf
  6d431d8ac22a9895182017951cb17af4e8ce14ee68353be337803f60999558d2
  ebf88d87131f7f8e4641d0a16ac0f81a2ee807d7b6384fe0c2023acd925e51dc
  abd55b2f56bfb5ec5ca4e44e64cb02976adc3fbeaf60ff7d6a808fe3f1b5954b
  01bbafcda59eb4c4ada6c1af90eef515c5f32b44d3bcea1f3641ea9664324e1f
  18e124861170470ba6d707bf0cb778975d0307caf2761ebcf0ec50cea8d52e56
  4203a428e662e69f4129c8dfde2a2bf5aff449bb2d6beaaf032d7778d665da5a
  789f2ed26aaed7dbe298b48d0e8c0420743bf8f880025cfdf43a3ba64b03765e`,
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
  logIn : jest.fn((response : SessionInformation) => null)
}

const routerMock = {
  navigate : jest.fn((commands : string[]) => null)
}
// end init Mocks

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: AuthService, useValue: authServiceMock }, // added to mock authservice
        { provide: Router, useValue: routerMock },
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

  it('Submit : Error', () => {
    const compiled = fixture.nativeElement as HTMLElement

    authServiceMock.login.mockReturnValueOnce(throwError('error'))

    let errorParagraph = fixture.debugElement.query(By.css('.error'))
    expect(errorParagraph).toBeFalsy()

    const form2 = fixture.debugElement.query(By.css('.login-form'))
    const submitFn = jest.spyOn(component, 'submit')
    form2.triggerEventHandler('submit', null)
    expect(submitFn).toHaveBeenCalled()
    expect(authServiceMock.login).toHaveBeenCalled()
    expect(component.onError).toBe(true)
    fixture.detectChanges() // Trigger a DOM rerender
    expect(fixture.debugElement.query(By.css('.error'))).toBeTruthy()
  })

  it('Submit : Success', () => {
    // nativeElement: The underlying DOM element at the root of the component.
    const compiled = fixture.nativeElement as HTMLElement

    const form2 = fixture.debugElement.query(By.css('.login-form'))
    const submitFn = jest.spyOn(component, 'submit')
    // If the event lacks a listener or there's some other problem, consider calling : nativeElement.dispatchEvent(eventObject).
    form2.triggerEventHandler('submit', null)
    expect(submitFn).toHaveBeenCalled()
    expect(authServiceMock.login).toHaveBeenCalled()
    expect(sessionServiceMock.logIn).toHaveBeenCalledWith(sessionInformation)
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sessions'])
  })


})
