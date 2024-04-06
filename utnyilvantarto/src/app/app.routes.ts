import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarRegisterComponent } from './car-register/car-register.component';
import { DriversComponent } from './drivers/drivers.component';
import { TripsComponent } from './trips/trips.component';
import { ReportComponent } from './report/report.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [

    {
        path: "",
        component: HomeComponent,
    },

    {
        path: "car-register",
        component: CarRegisterComponent,
    },

    {
        path: "drivers",
        component: DriversComponent,
    },

    {
        path: "trips",
        component: TripsComponent,
    },

    {
        path: "report",
        component: ReportComponent,
    },

    {
        path: "registration",
        component: RegistrationComponent,
    },

];
