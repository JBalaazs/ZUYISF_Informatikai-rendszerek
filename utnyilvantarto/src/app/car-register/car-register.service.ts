import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../../server/src/entity/Car';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<Car[]>('/api/car');
    }

}
