import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { of } from 'rxjs';
import { Session } from '../interfaces/session.interface';

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

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpClient : HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(SessionApiService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('delete', () => {
    httpClient.delete = jest.fn()
    service.delete("1")
    expect(httpClient.delete).toHaveBeenCalledWith("api/session/1")
  })

  it('create', () => {
    httpClient.post = jest.fn()
    service.create(session)
    expect(httpClient.post).toHaveBeenCalledWith("api/session", session)
  })

  it('update', () => {
    httpClient.put = jest.fn()
    service.update("1", session)
    expect(httpClient.put).toHaveBeenCalledWith("api/session/1", session)
  })
});
