import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../models/Driver';

@Injectable({
    providedIn: 'root'
})
export class DriverService {

    constructor(private http: HttpClient) { }

    getDrivers() {
        return this.http.get<Driver[]>('http://localhost:3000/api/data/drivers');
    }

    updateDriver(selectedDriver: Driver) {
        return this.http.put<Driver>("http://localhost:3000/api/data/drivers/update", selectedDriver);
    }

}
