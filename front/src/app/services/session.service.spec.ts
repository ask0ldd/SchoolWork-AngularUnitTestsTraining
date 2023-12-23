import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

const sessionInformation : SessionInformation = {
  token: 
  `e85c9ffdaeff0bf290b2eebffd25ff56255d0a2c163edf229ebb83b189334962
  22724c1dd101ed52d9d88ea1c71eab235a7a4dbd380539b5e779373627460acc
  09193a12b1e67899ad9c16ebf95df5a5ba15e4ac2f546d4780283caecabc6bbf
  6d431d8ac22a9895182017951cb17af4e8ce14ee68353be337803f60999558d2
  ebf88d87131f7f8e4641d0a16ac0f81a2ee807d7b6384fe0c2023acd925e51dc
  abd55b2f56bfb5ec5ca4e44e64cb02976adc3fbeaf60ff7d6a808fe3f1b5954b
  01bbafcda59eb4c4ada6c1af90eef515c5f32b44d3bcea1f3641ea9664324e1f
  18e124861170470ba6d707bf0cb778975d0307caf2761ebcf0ec50cea8d52e56
  4203a428e662e69f4129c8dfde2a2bf5aff449bb2d6beaaf032d7778d665da5a
  789f2ed26aaed7dbe298b48d0e8c0420743bf8f880025cfdf43a3ba64b03765e`,
  type: 'type',
  id: 0,
  username: 'username',
  firstName: 'firstname',
  lastName: 'lastname',
  admin: true
}

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('The Login method store the session informations and a positive login status is emitted through $îsLogged', () => {
    service.logIn(sessionInformation)
    expect(service.isLogged).toBeTruthy()
    expect(service.sessionInformation).toEqual(sessionInformation)
    service.$isLogged().subscribe(value => {
      expect(value).toBeTruthy()
    })
  })

  it('The Logout method dump the session informations and a negative login status is emitted through $îsLogged', () => {
    service.logOut()
    expect(service.isLogged).toBeFalsy()
    expect(service.sessionInformation).toBeUndefined()
    service.$isLogged().subscribe(value => {
      expect(value).toBeFalsy()
    })
  })

});
