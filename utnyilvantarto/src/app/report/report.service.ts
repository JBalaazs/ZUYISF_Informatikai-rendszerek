import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../../server/src/entity/Car';
import { Trip } from '../../../server/src/entity/Trip';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<Car[]>('/api/car');
    }

    getTrip() {
        return this.http.get<Trip[]>('/api/trip');
    }

}
