import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { of } from 'rxjs';

const teacher = {
  id: 1,
  lastName: "lastname",
  firstName: "firstname",
  createdAt: new Date(),
  updatedAt: new Date(),
}


describe('TeacherService', () => {
  let service: TeacherService;
  let httpClient : HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(TeacherService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('An array of all teachers can be retrieved', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'get').mockReturnValue(of([{...teacher}, {...teacher}]))
    service.all().subscribe(teachers => {
      expect(teachers).toEqual([{...teacher}, {...teacher}])
      expect(httpClientSpy).toHaveBeenCalledWith("api/teacher")
    })
  })

  it('The details for a target teacher can be retrieved', () => {
    const httpClientSpy = jest.spyOn(httpClient, 'get').mockReturnValue(of({...teacher}))
    service.detail("1").subscribe(retTeacher => {
      expect(retTeacher).toEqual({...teacher})
      expect(httpClientSpy).toHaveBeenCalledWith("api/teacher/1")
    })
  })
});
