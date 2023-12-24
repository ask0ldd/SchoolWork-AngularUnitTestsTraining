import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { By } from '@angular/platform-browser';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('FormComponent', () => {

  const session : Session = {
    id : 1,
    name : 'name',
    description : 'description',
    date : new Date("10/10/2023"),
    teacher_id : 1,
    users : [2, 3],
    createdAt : new Date(),
    updatedAt : new Date(),
  }
  
  const shortSession = {
    name : 'name',
    description : 'description',
    date : new Date("10/10/2023"),
    teacher_id : 1,
  }
  
  const sessionApiServiceMock = {
    create : jest.fn((session : Session) => of(session)),
    update : jest.fn((id : string | undefined, session : Session) => of(session)),
  }
  
  const snackBarMock = {
    open : jest.fn()
  }

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  } 

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide: MatSnackBar, useValue : snackBarMock },
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form : required input missing => submit button disabled', () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(component).toBeTruthy()
    const nameInput = component?.sessionForm?.get("name")
    expect(nameInput).toBeTruthy()
    expect(nameInput?.value).toBe("")
    // component.submit()
    expect(component?.sessionForm?.invalid).toBeTruthy()
    const submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement
    expect(submitButton.disabled).toBe(true)
  })

  it('form : no required input missing => submit button enabled & submit can be triggered', () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(component).toBeTruthy()

    expect(component?.sessionForm?.invalid).toBeTruthy()
    const submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement
    expect(submitButton.disabled).toBe(true)

    const nameInput = component?.sessionForm?.get("name")
    expect(nameInput).toBeTruthy()
    expect(nameInput?.value).toBe("")
    nameInput?.setValue(session.name)
    expect(nameInput?.value).toBe("name")

    const dateInput = component?.sessionForm?.get("date")
    expect(dateInput).toBeTruthy()
    expect(dateInput?.value).toBe("")
    dateInput?.setValue("10/10/2023")
    expect(dateInput?.value).toBe("10/10/2023")
    
    const teacherInput = component?.sessionForm?.get("teacher_id")
    expect(teacherInput).toBeTruthy()
    expect(teacherInput?.value).toBe("")
    teacherInput?.setValue(session.teacher_id.toString())
    expect(teacherInput?.value).toBe("1")

    const descriptionInput = component?.sessionForm?.get("description")
    expect(descriptionInput).toBeTruthy()
    expect(descriptionInput?.value).toBe("")
    descriptionInput?.setValue(session.description)
    expect(descriptionInput?.value).toBe("description")

    fixture.detectChanges()

    expect(submitButton.disabled).toBe(false)

  })

  it('form : submit form : create session', () => {
    component.onUpdate = false

    const router = TestBed.inject(Router) // retrieve an instance of a service from the TestBed's injector
    const matSnackBar = TestBed.inject(MatSnackBarModule)

    const compiled = fixture.nativeElement as HTMLElement
    expect(component).toBeTruthy()

    expect(component?.sessionForm?.invalid).toBeTruthy()
    const submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement
    expect(submitButton.disabled).toBe(true)

    const nameInput = component?.sessionForm?.get("name")
    nameInput?.setValue(session.name)
    expect(nameInput?.value).toBe("name")

    const dateInput = component?.sessionForm?.get("date")
    dateInput?.setValue("10/10/2023")
    expect(dateInput?.value).toBe("10/10/2023")
    
    const teacherInput = component?.sessionForm?.get("teacher_id")
    teacherInput?.setValue(session.teacher_id.toString())
    expect(teacherInput?.value).toBe("1")

    const descriptionInput = component?.sessionForm?.get("description")
    descriptionInput?.setValue(session.description)
    expect(descriptionInput?.value).toBe("description")

    fixture.detectChanges()

    expect(submitButton.disabled).toBe(false)

    const submitFn = jest.spyOn(component, 'submit')

    // avoid any navigation after the form is submitted
    router.navigate = jest.fn()

    const form = fixture.debugElement.query(By.css('.mt2'))
    form.triggerEventHandler('submit', null)

    // the session api have been called for a session creation
    expect(sessionApiServiceMock.create).toHaveBeenCalledWith({...shortSession, teacher_id : session.teacher_id.toString(), date : "10/10/2023"})
    expect(router.navigate).toHaveBeenCalledWith(['sessions'])
    expect(snackBarMock.open).toHaveBeenCalledWith("Session created !", "Close", {"duration": 3000})
    // !!! test snackbar into dom
  })

  it('form : submit form : update session', () => {
    component.onUpdate = true // !!! should use router instead with update into url

    const router = TestBed.inject(Router) // retrieve an instance of a service from the TestBed's injector
    // router = jest.mock('url', () => { return null })
    const matSnackBar = TestBed.inject(MatSnackBarModule)

    const compiled = fixture.nativeElement as HTMLElement
    expect(component).toBeTruthy()

    expect(component?.sessionForm?.invalid).toBeTruthy()
    const submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement
    expect(submitButton.disabled).toBe(true)

    const nameInput = component?.sessionForm?.get("name")
    nameInput?.setValue(session.name)
    expect(nameInput?.value).toBe("name")

    const dateInput = component?.sessionForm?.get("date")
    dateInput?.setValue("10/10/2023")
    expect(dateInput?.value).toBe("10/10/2023")
    
    const teacherInput = component?.sessionForm?.get("teacher_id")
    teacherInput?.setValue(session.teacher_id.toString())
    expect(teacherInput?.value).toBe("1")

    const descriptionInput = component?.sessionForm?.get("description")
    descriptionInput?.setValue(session.description)
    expect(descriptionInput?.value).toBe("description")

    fixture.detectChanges()

    expect(submitButton.disabled).toBe(false)

    const submitFn = jest.spyOn(component, 'submit')

    // avoid any navigation after the form is submitted
    router.navigate = jest.fn()

    const form = fixture.debugElement.query(By.css('.mt2'))
    form.triggerEventHandler('submit', null)

    // the session api have been called for a session creation
    expect(sessionApiServiceMock.update).toHaveBeenCalledWith(undefined, {...shortSession, teacher_id : session.teacher_id.toString(), date : "10/10/2023"})
    expect(router.navigate).toHaveBeenCalledWith(['sessions'])
    expect(snackBarMock.open).toHaveBeenCalledWith('Session updated !', "Close", {"duration": 3000})
  })


})
