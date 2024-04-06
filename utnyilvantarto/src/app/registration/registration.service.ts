import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) { }

    postReg(userData: User){
        return this.http.post<AuthResponse>('http://localhost:3000/api/data/registration/upload', userData);
    }

    getUser() {
        return this.http.get<User[]>('http://localhost:3000/api/data/registration');
    }

    saveJWT(token: string): void{
        localStorage.setItem('jwtToken', token);
    }

    login(userData: User){
        return this.http.post<AuthResponse>('http://localhost:3000/api/data/login', userData);
    }

}
