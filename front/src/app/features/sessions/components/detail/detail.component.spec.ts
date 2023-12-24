import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { By } from '@angular/platform-browser';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';
import { SessionApiService } from '../../services/session-api.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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

const teacher = {
  id: 1,
  lastName: "lastname",
  firstName: "firstname",
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>; 
  let service: SessionService;

  const userId = 1

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: userId
    }
  }

  const mockSessionAPIService = {
    detail : jest.fn(() => of(session)),
    participate : jest.fn(() => {
      // adds the current user to the session participants
      if(!session.users.includes(userId)) session.users.push(userId)
      return of(void 0)
    }),
    unParticipate : jest.fn(() => {
      if(session.users.includes(userId)) session.users.pop()
      return of(void 0)
    })
  }

  const mockTeacherService = {
    detail : jest.fn(() => of(teacher))
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
        ReactiveFormsModule
      ],
      declarations: [DetailComponent], 
      providers: [{ provide: SessionService, useValue: mockSessionService },
      {provide: SessionApiService, useValue : mockSessionAPIService},
      {provide: TeacherService, useValue : mockTeacherService}],
    })
      .compileComponents();
    service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch expected teacher & session and display those', () => {
    expect(component.teacher).toEqual(teacher)
    expect(component.session).toEqual(session)
  })

  it('should go back in history when clicking on the back button', () => {
    component.sessionId = "1"
    const windowHistorySpy = jest.spyOn(window.history, 'back')
    const backButton = fixture.debugElement.query(By.css('button'))
    backButton.triggerEventHandler('click', null)
    expect(windowHistorySpy).toHaveBeenCalled()
  })

  it('participate button clicked', () => {
    session.users = [2,3]
    const buttons = fixture.debugElement.queryAll(By.css('button'))
    const participateButton = buttons[2]
    participateButton.triggerEventHandler('click', null)
    expect(mockSessionAPIService.participate).toHaveBeenCalled()
  })
  
});

