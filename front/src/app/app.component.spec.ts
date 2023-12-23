import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';


describe('AppComponent', () => {
  let sessionService : SessionService
  let router : Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    sessionService = TestBed.inject(SessionService)
    router = TestBed.inject(Router)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('when Logged should display a menu with 3 items : Sessions, Account, Logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    sessionService.$isLogged = jest.fn(() => of(true))
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('.link')).length).toEqual(3)
    const insideSpansTexts = fixture.debugElement.queryAll(By.css('.link')).map(element => (element.nativeElement as HTMLSpanElement).textContent)
    expect(insideSpansTexts).toStrictEqual(['Sessions', 'Account', 'Logout'])
  })

  it('when Logged should display a menu with 2 items : Login & Register', () => {
    const fixture = TestBed.createComponent(AppComponent);
    sessionService.$isLogged = jest.fn(() => of(false))
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('.link')).length).toEqual(2)
    const insideSpansTexts = fixture.debugElement.queryAll(By.css('.link')).map(element => (element.nativeElement as HTMLSpanElement).textContent)
    expect(insideSpansTexts).toStrictEqual(['Login', 'Register'])
  })

  it('when Logged can logout then be redirected to the homepage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let isLogged = true
    sessionService.$isLogged = jest.fn(() => of(isLogged))
    sessionService.logOut = jest.fn(() => void 0)
    const routerSpy = jest.spyOn(router, 'navigate')
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('.link')).length).toEqual(3)
    const logoutMenuItem = fixture.debugElement.queryAll(By.css('.link'))[2]
    logoutMenuItem.triggerEventHandler('click', null)
    expect(sessionService.logOut).toHaveBeenCalled()
    expect(routerSpy).toHaveBeenCalledWith([''])
  })

});
