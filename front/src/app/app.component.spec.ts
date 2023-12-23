import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  let sessionService : SessionService
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

    sessionService = TestBed.inject(SessionService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('when Logged should display a menu with 3 items : Sessions, Account, Logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    sessionService.$isLogged = jest.fn(() => of(true))
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('.link')).length).toEqual(3)
    const insideSpansTexts = fixture.debugElement.queryAll(By.css('.link')).map(element => (element.nativeElement as HTMLSpanElement).textContent)
    expect(insideSpansTexts).toStrictEqual(['Sessions', 'Account', 'Logout'])
  });

});
