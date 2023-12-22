import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  // emits islogged on every change
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.next(); // ask for an emittion 
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.next(); // ask for an emittion 
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged); // start an emission
  }
}
