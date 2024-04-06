import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/Car';
import { Trip } from '../models/Trip';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<Car[]>('http://localhost:3000/api/data/cars');
    }

    getTrip() {
        return this.http.get<Trip[]>('http://localhost:3000/api/data/trips');
    }

    callProtectedEndpoint(token: string) {
        const headers = { Authorization: `Bearer ` + token };
        return this.http.post<any>('http://localhost:3000/api/data/protected_endpoint', {}, { headers });
      }

}
