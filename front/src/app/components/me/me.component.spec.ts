import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { expect } from '@jest/globals';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const mockSessionService = {
  sessionInformation: {
    admin: false,
    id: 1
  },
  logOut : jest.fn()
}

const mockUserService = {
  getById : (id : string) => of({
    id: 1,
    email: 'email@email.com',
    lastName: 'lastname',
    firstName: 'firstname',
    admin: false,
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  delete : jest.fn((id) => of(void 0))
}

const snackBarMock = {
  open : jest.fn()
}

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let router : Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue : snackBarMock },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go back in history when clicking on the back button', () => {
    const windowHistorySpy = jest.spyOn(window.history, 'back')
    const backButton = fixture.debugElement.query(By.css('button[mat-icon-button]'))
    backButton.triggerEventHandler('click', null)
    expect(windowHistorySpy).toHaveBeenCalled()
  })

  it('delete my account button should be displayed and working', () => {
    const router = TestBed.inject(Router)
    router.navigate = jest.fn()
    fixture.detectChanges()
    const deleteAccountButton = fixture.debugElement.query(By.css('button[color="warn"]'))
    deleteAccountButton.triggerEventHandler('click', null)
    expect(mockUserService.delete).toHaveBeenCalledWith(mockSessionService.sessionInformation.id.toString())
    expect(snackBarMock.open).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 })
    expect(mockSessionService.logOut).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })

})
