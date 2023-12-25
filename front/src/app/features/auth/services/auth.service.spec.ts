import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { expect } from '@jest/globals';
import { LoginRequest } from "../interfaces/loginRequest.interface";
import { SessionInformation } from "src/app/interfaces/sessionInformation.interface";
import { of } from "rxjs/internal/observable/of";

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

describe('YourServiceName', () => {
    let authService: AuthService;
    let httpClient: HttpClient;
    const pathService = 'api/auth'
  
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [AuthService],
        });
        authService = TestBed.inject(AuthService);
        httpClient = TestBed.inject(HttpClient);
    });
  
    it('should be created', () => {
        expect(authService).toBeTruthy();
    });
  
    it('should make a POST request to the login endpoint', () => {

        const loginRequest: LoginRequest = {
            email: "email@email.com",
            password: "password"
        }
        const expectedUrl = `${pathService}/login`

        jest.spyOn(httpClient, 'post').mockReturnValue(of(sessionInformation))

        authService.login(loginRequest).subscribe((response) => {
        expect(httpClient.post).toHaveBeenCalledWith(expectedUrl, loginRequest)
        expect(response).toEqual(sessionInformation)
        })
    })

});