import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/Car';
import { Driver } from '../models/Driver';
import { Trip } from '../models/Trip';

@Injectable({
    providedIn: 'root'
})
export class TripService {

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<Car[]>('http://localhost:3000/api/data/cars');
    }

    getDrivers() {
        return this.http.get<Driver[]>('http://localhost:3000/api/data/drivers');
    }

    postTrip(tripData: Trip){
        return this.http.post<Trip>('http://localhost:3000/api/data/trips/upload', tripData);
    }

    getTrip() {
        return this.http.get<Trip[]>('http://localhost:3000/api/data/trips');
    }

    updateTrip(selectedTrip: Trip) {
        return this.http.put<Trip>('http://localhost:3000/api/data/trips/update', selectedTrip);
    }

}
