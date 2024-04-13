import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../../server/src/entity/Car';
import { Driver } from '../../../server/src/entity/Driver';
import { Trip } from '../../../server/src/entity/Trip';

@Injectable({
    providedIn: 'root'
})
export class TripService {

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<Car[]>('/api/car');
    }

    getDrivers() {
        return this.http.get<Driver[]>('/api/driver');
    }

    postTrip(tripData: Trip){
        return this.http.post<Trip>('/api/trip/upload', tripData);
    }

    getTrip() {
        return this.http.get<Trip[]>('/api/trip');
    }

    updateTrip(selectedTrip: Trip) {
        return this.http.put<Trip>('/api/trip/update', selectedTrip);
    }

}
