import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Observable, of } from 'rxjs';
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

  it('all', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'get').mockReturnValue(of([{...session}, {...session}]))
    service.all().subscribe(sessions => {
      expect(sessions).toEqual([{...session}, {...session}])
      expect(httpClientSpy).toHaveBeenCalledWith("api/session")
    })
  })

  it('detail', () => {
    // httpClient.get = jest.fn((url : string) : Observable<Session> => of(session))
    // service.detail("1")
    // expect(httpClient.get).toHaveBeenCalledWith("api/session/1")
    const httpClientSpy = jest.spyOn(httpClient, 'get').mockReturnValue(of(session))
    service.detail("1").subscribe(retSession => {
      expect(retSession).toEqual(session)
      expect(httpClientSpy).toHaveBeenCalledWith("api/session")
    })
  })

  it('delete', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'delete').mockReturnValue(of(null))
    service.delete("1").subscribe(retVal => {
      expect(retVal).toEqual(null)
      expect(httpClientSpy).toHaveBeenCalledWith("api/session/1")
    })
  })

  it('create', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'post').mockReturnValue(of(session))
    service.create(session).subscribe(retSession => {
      expect(retSession).toEqual(session)
      expect(httpClientSpy).toHaveBeenCalledWith("api/session", session)
    })
  })

  it('update', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'put').mockReturnValue(of(session))
    service.update("1", session).subscribe(retSession => {
      expect(retSession).toEqual(session)
      expect(httpClientSpy).toHaveBeenCalledWith("api/session/1", session)
    })
  })

  it('participate', () => {
    httpClient.post = jest.fn()
    service.participate("1", "2")
    expect(httpClient.post).toHaveBeenCalledWith("api/session/1/participate/2", null)
  })

  it('unparticipate', () => {
    httpClient.delete = jest.fn()
    service.unParticipate("1", "2")
    expect(httpClient.delete).toHaveBeenCalledWith("api/session/1/participate/2")
  })
});
