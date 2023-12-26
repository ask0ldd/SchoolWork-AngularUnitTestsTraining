import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { AuthService } from '../../services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

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
  register: jest.fn((registerRequest : RegisterRequest) => of(void 0))
}

const sessionServiceMock = {
  logIn : jest.fn((response : SessionInformation) => null)
}

const routerMock = {
  navigate : jest.fn((commands : string[]) => null)
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: AuthService, useValue: authServiceMock }, // added to mock authservice
        { provide: Router, useValue: routerMock },
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a disabled submit button if the form is incomplete', () => {
    const submitButton = fixture.debugElement.query(By.css('button[color="primary"]'))
    expect(submitButton.properties['disabled']).toBeTruthy()
  })

  it('should display a functional submit button if the form is complete and valid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[color="primary"]'))
    const formInputs = fixture.debugElement.queryAll(By.css('input'))
    formInputs[0].triggerEventHandler('input', { target: { value: 'firstname'}})
    formInputs[1].triggerEventHandler('input', { target: { value: 'lastname'}})
    formInputs[2].triggerEventHandler('input', { target: { value: 'firstname.lastname@email.com'}})
    formInputs[3].triggerEventHandler('input', { target: { value: 'randompassword123'}})
    fixture.detectChanges()
    expect(submitButton.properties['disabled']).toBeFalsy()
  })

  test('if the form is complete / valid, should be redirected to login when submitted', () => {
    const router = TestBed.inject(Router)
    const authService = TestBed.inject(AuthService)
    const submitFn = jest.spyOn(component, 'submit')
    const submitButton = fixture.debugElement.query(By.css('button[color="primary"]'))
    const formInputs = fixture.debugElement.queryAll(By.css('input'))
    formInputs[0].triggerEventHandler('input', { target: { value: 'firstname'}})
    formInputs[1].triggerEventHandler('input', { target: { value: 'lastname'}})
    formInputs[2].triggerEventHandler('input', { target: { value: 'firstname.lastname@email.com'}})
    formInputs[3].triggerEventHandler('input', { target: { value: 'randompassword123'}})
    fixture.detectChanges()
    expect(submitButton.properties['disabled']).toBeFalsy()
    const form = fixture.debugElement.query(By.css('form'))
    form.triggerEventHandler('submit', null)
    expect(submitFn).toHaveBeenCalled()
    expect(authService.register).toHaveBeenCalledWith(component.form.value as RegisterRequest)
    expect(router.navigate).toHaveBeenCalledWith(['/login'])
  })

  test('if the form is complete but invalid, should display an error', () => {
    const router = TestBed.inject(Router)
    const authService = TestBed.inject(AuthService)
    const submitFn = jest.spyOn(component, 'submit')
    const submitButton = fixture.debugElement.query(By.css('button[color="primary"]'))
    const formInputs = fixture.debugElement.queryAll(By.css('input'))
    formInputs[0].triggerEventHandler('input', { target: { value: '**'}})
    formInputs[1].triggerEventHandler('input', { target: { value: 'lastname'}})
    formInputs[2].triggerEventHandler('input', { target: { value: 'firstname.lastname@email.com'}})
    formInputs[3].triggerEventHandler('input', { target: { value: 'randompassword123'}})
    fixture.detectChanges()
    expect(submitButton.properties['disabled']).toBeFalsy()
    const form = fixture.debugElement.query(By.css('form'))
    form.triggerEventHandler('submit', null)
    expect(submitFn).toHaveBeenCalled()
    expect(authService.register).toHaveBeenCalledWith(component.form.value as RegisterRequest)
    fixture.detectChanges()
    expect(component.onError).toBeTruthy()
  })

  // do form invalid this.onError

  /*it('should display a disabled submit button if firstname is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[color="primary"]'))
    const formInputs = fixture.debugElement.queryAll(By.css('input'))
    formInputs[0].triggerEventHandler('input', { target: { value: 'firstname******************************************************************'}})
    formInputs[1].triggerEventHandler('input', { target: { value: 'lastname'}})
    formInputs[2].triggerEventHandler('input', { target: { value: 'firstname.lastname@email.com'}})
    formInputs[3].triggerEventHandler('input', { target: { value: 'randompassword123'}})
    fixture.detectChanges()
    expect(submitButton.properties['disabled']).toBeTruthy()
  })*/

});
