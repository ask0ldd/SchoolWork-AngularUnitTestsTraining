import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
import { ActivatedRoute, Router } from '@angular/router';


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
      admin: false, // had to switch to false
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
    }), 
    delete : jest.fn(() => of(void 0))
  }

  const mockTeacherService = {
    detail : jest.fn(() => of(teacher))
  }

  const snackBarMock = {
    open : jest.fn()
  }

  const activatedRouteMock = {
    snapshot : {
      paramMap : {
        get : (id : any) => 1
      }
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
        ReactiveFormsModule
      ],
      declarations: [DetailComponent], 
      providers: [{ provide: SessionService, useValue: mockSessionService },
      {provide: SessionApiService, useValue : mockSessionAPIService},
      {provide: TeacherService, useValue : mockTeacherService},
      { provide: MatSnackBar, useValue : snackBarMock },
      { provide: ActivatedRoute, useValue : activatedRouteMock },
    ]
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
    const windowHistorySpy = jest.spyOn(window.history, 'back')
    const backButton = fixture.debugElement.query(By.css('button[mat-icon-button]'))
    backButton.triggerEventHandler('click', null)
    expect(windowHistorySpy).toHaveBeenCalled()
  })

  it('if not admin, button participate should be displayed and working', () => {
    // component.sessionId = "1"
    // component.userId = "1"
    // session.users = [2, 3]
    // component.isAdmin = false
    // fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'))
    expect(buttons.length).toBe(2)
    const participateButton = fixture.debugElement.query(By.css('button[color="primary"]'))
    participateButton.triggerEventHandler('click', null)
    expect(mockSessionAPIService.participate).toHaveBeenCalled()
    expect(session.users.includes(userId)).toBeTruthy()    
  })

  it('if not admin and user participation to the session, button unparticipate should be displayed and working', () => {
    mockSessionAPIService.participate()
    fixture.detectChanges()
    const buttons = fixture.debugElement.queryAll(By.css('button'))
    expect(buttons.length).toBe(2)
    const unparticipateButton = /*buttons[1]*/ fixture.debugElement.query(By.css('button[color="warn"]'))
    unparticipateButton.triggerEventHandler('click', null)
    expect(mockSessionAPIService.unParticipate).toHaveBeenCalled()
    expect(session.users.includes(userId)).toBeFalsy()    
  })

  it('if admin, delete button should be displayed and working', () => {
    component.isAdmin = true
    const router = TestBed.inject(Router)
    router.navigate = jest.fn()
    mockSessionService.sessionInformation.admin = true;
    fixture.detectChanges()
    const buttons = fixture.debugElement.queryAll(By.css('button'))
    const deleteButton = /*buttons[1]*/ fixture.debugElement.query(By.css('button[color="warn"]'))
    deleteButton.triggerEventHandler('click', null)
    expect(mockSessionAPIService.delete).toHaveBeenCalledWith(session.id)
    expect(router.navigate).toHaveBeenCalledWith(['sessions'])
    expect(snackBarMock.open).toHaveBeenCalledWith('Session deleted !', 'Close', { duration: 3000 })
  })
  
  // tester tous les autres affichages conditionnels (ngif)


})

