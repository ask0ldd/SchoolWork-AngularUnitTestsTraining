import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { of } from 'rxjs';

const user : User = {
  id: 1,
  email: 'email@email.com',
  firstName: 'string',
  lastName: 'string',
  admin: true,
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date(),
}

/*
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  admin: boolean;
  password: string;
  createdAt: Date;
  updatedAt?: Date;*/

describe('UserService', () => {
  let service: UserService;
  let httpClient : HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getById', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'get').mockReturnValue(of({...user}))
    service.getById("1").subscribe(retUser => {
      expect(retUser).toEqual({...user})
      expect(httpClientSpy).toHaveBeenCalledWith("api/user/1")
    })
  })
});
