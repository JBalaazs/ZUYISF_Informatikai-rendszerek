import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverService } from './drivers.service';
import { Driver } from '../../../server/src/entity/Driver';
import { TokenService } from '../token.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {

  drivers: Driver[] = [];

  constructor(private driverService: DriverService, private tokenService: TokenService) { }

  isLogged: boolean = false;

  ngOnInit(): void {
      this.driverService.getDrivers().subscribe((data: Driver[]) =>{
        this.drivers = data;
      })
      
      this.tokenService.checkTokenValidity().subscribe(isLogged => { /*token.service.ts*/
        if (isLogged) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      });
  }

  isVisibleChangeForm: boolean = false;

  selectedDriver: Driver[] = [];

  isLicenseExpired(drivers: Driver): boolean{

    if(drivers.licenseExpirationDate){

      const currentDate = new Date();
      const expirationDate = new Date(drivers.licenseExpirationDate);

      const currentYear = currentDate.getFullYear();
      const expirationYear = expirationDate.getFullYear();

      if( currentYear > expirationYear ){

        return true;

      }
      else if(currentYear == expirationYear){

          const currentMonth = currentDate.getMonth();
          const expirationMonth = expirationDate.getMonth();

          if(currentMonth > expirationMonth)
          {
            return true;
          }
          else if(currentMonth == expirationMonth){

            const currentDay = currentDate.getDay();
            const expirationDay = expirationDate.getDay();

            if(currentDay > expirationDay){

              return true;

            }

          }

      }
  }

    return false;

  }

  changeDriver(driver: Driver){

    this.isVisibleChangeForm = true;

    this.selectedDriver = [driver];

  }

  saveDriverChanges(selectedDriver: Driver) {
    const index = this.drivers.findIndex((driver) => driver.Id == selectedDriver.Id);

    if (index > -1) {
      this.driverService.updateDriver(selectedDriver).subscribe(() => {
          this.driverService.getDrivers().subscribe((data: Driver[]) => { /*Így egyből lefrissül.*/
            this.drivers = data;
            this.hideChangesForm();
          });
        });
    }
}



  hideChangesForm(){

    this.isVisibleChangeForm = false;

  }

}
