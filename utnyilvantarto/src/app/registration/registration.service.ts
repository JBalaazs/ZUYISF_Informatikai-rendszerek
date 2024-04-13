import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../server/src/entity/User';
import { AuthResponse } from '../models/AuthResponse';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) { }

    postReg(userData: User){
        return this.http.post<AuthResponse>('/api/registration/upload', userData);
    }

    getUser() {
        return this.http.get<User[]>('/api/user');
    }

    saveJWT(token: string): void{

        localStorage.setItem('jwtToken', token);
        //console.log(token);
    }

    login(userData: User){
        return this.http.post<AuthResponse>('/api/login', userData);
    }

    callProtectedEndpoint(token: string) {
        const headers = { Authorization: `Bearer ` + token };
        return this.http.post<any>('/api/protected_endpoint', {}, { headers });
      }

}
