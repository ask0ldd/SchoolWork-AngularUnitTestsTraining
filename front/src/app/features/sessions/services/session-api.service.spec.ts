import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { of } from 'rxjs';

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
});
