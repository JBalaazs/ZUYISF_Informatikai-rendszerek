import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../../../server/src/entity/Driver';

@Injectable({
    providedIn: 'root'
})
export class DriverService {

    constructor(private http: HttpClient) { }

    getDrivers() {
        return this.http.get<Driver[]>('/api/driver');
    }

    updateDriver(selectedDriver: Driver) {
        return this.http.put<Driver>("/api/driver/update", selectedDriver);
    }

}
