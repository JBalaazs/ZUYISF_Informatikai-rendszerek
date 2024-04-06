import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/Car';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<Car[]>('http://localhost:3000/api/data/cars');
    }

}
