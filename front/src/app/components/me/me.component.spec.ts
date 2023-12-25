import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    admin: true,
    id: 1
  },
  logOut : () => void 0
}

const mockUserService = {
  getById : (id : string) => of({
    id: 1,
    email: 'email@email.com',
    lastName: 'lastname',
    firstName: 'firstname',
    admin: true,
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  delete : () => of(void 0)
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
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
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

})
