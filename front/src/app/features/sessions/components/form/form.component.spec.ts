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

const session : Session = {
  id : 1,
  name : 'name',
  description : 'description',
  date : new Date(),
  teacher_id : 1,
  users : [2, 3],
  createdAt : new Date(),
  updatedAt : new Date(),
}


/*
export interface Session {
  id?: number;
  name: string;
  description: string;
  date: Date;
  teacher_id: number;
  users: number[];
  createdAt?: Date;
  updatedAt?: Date;
}
*/

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
        SessionApiService
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
    nameInput?.setValue("name")
    expect(nameInput?.value).toBe("name")

    const dateInput = component?.sessionForm?.get("date")
    expect(dateInput).toBeTruthy()
    expect(dateInput?.value).toBe("")
    dateInput?.setValue("10/10/2023")
    expect(dateInput?.value).toBe("10/10/2023")
    
    const teacherInput = component?.sessionForm?.get("teacher_id")
    expect(teacherInput).toBeTruthy()
    expect(teacherInput?.value).toBe("")
    teacherInput?.setValue("1")
    expect(teacherInput?.value).toBe("1")

    const descriptionInput = component?.sessionForm?.get("description")
    expect(descriptionInput).toBeTruthy()
    expect(descriptionInput?.value).toBe("")
    descriptionInput?.setValue("description")
    expect(descriptionInput?.value).toBe("description")

    fixture.detectChanges()

    expect(submitButton.disabled).toBe(false)

  })


})
