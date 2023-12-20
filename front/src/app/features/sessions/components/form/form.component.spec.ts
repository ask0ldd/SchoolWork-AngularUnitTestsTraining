import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
  create : jest.fn((session : Session) => of(session))
}

/*const routerMock = {
  navigate : jest.fn((commands : string[]) => Router.)
}*/

describe('FormComponent', () => {
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
        // { provide: Router, useValue: routerMock },
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

  it('form : submit form', () => {
    component.onUpdate = false

    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

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

    const form = fixture.debugElement.query(By.css('.mt2'))
    form.triggerEventHandler('submit', null)

    expect(sessionApiServiceMock.create).toHaveBeenCalledWith({...shortSession, teacher_id : session.teacher_id.toString(), date : "10/10/2023"})
    expect(navigateSpy).toHaveBeenCalledWith(['sessions'])

  })


})
