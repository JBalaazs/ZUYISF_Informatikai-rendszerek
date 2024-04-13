import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TripService } from './trips.service';
import { Car } from '../../../server/src/entity/Car';
import { Driver } from '../../../server/src/entity/Driver';
import { Trip } from '../../../server/src/entity/Trip';
import { TokenService } from '../token.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  validDrivers: Driver[] = [];

  carsData: Car[] = [];

  driversData: Driver[] = [];

  tripsData: Trip[] = [];

  defaultCar: string = '';
  defaultDriver: string = '';
  defaultType: string = 'Magán';
  defaultReturn: string = 'Nem';

  isVisibleChangeForm: boolean = false;
  selectedTrip: Trip[] = [];

  isLogged:boolean = false;

  constructor(private tripService: TripService, private tokenService: TokenService) { }

  ngOnInit(): void
  {

    this.tripService.getCars().subscribe((data: Car[]) => {
      this.carsData = data;
      
      if(this.carsData.length > 0 && this.carsData[0].model !== undefined){
        this.defaultCar = this.carsData[0].model;
      }

    });

    this.tripService.getDrivers().subscribe((data: Driver[]) =>{
      this.driversData = data;
      this.validDrivers = this.driversData.filter(driver => !this.isLicenseExpired(driver));

      if(this.driversData.length > 0 && this.driversData[0].name !== undefined){
        this.defaultDriver = this.driversData[0].name;
      }
    });

    this.tripService.getTrip().subscribe((data: Trip[]) => {
      this.tripsData = data;
    });

    this.tokenService.checkTokenValidity().subscribe(isLogged => { /*token.service.ts*/
      if (isLogged) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });

  }

  isLicenseExpired(driverdatas: Driver): boolean{


    if(driverdatas.licenseExpirationDate){

      const currentDate = new Date();
      const expirationDate = new Date(driverdatas.licenseExpirationDate);

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

  saveTrip(tripForm: NgForm){

    //console.warn(tripForm.value);

    const tripData = {
      Id: tripForm.value.Id,
      car: tripForm.value.carSelect || this.carsData[0].model,
      driver: tripForm.value.driverSelect || this.driversData[0].name,
      startDate: tripForm.value.startDate,
      tripType: tripForm.value.type,
      startPlace: tripForm.value.startPlace,
      endPlace: tripForm.value.endPlace,
      distance: tripForm.value.distance,
      newMileage: tripForm.value.newMileage,
      return: tripForm.value.return /*Nem írja bele az adatbázisba, de szükségem van erre az értékre.*/

    }

    let isCorrectKM: number;
    let max = Number.MIN_VALUE;
    let isThere: boolean = false;
    let isValidDate: boolean = false;

    if( !(this.tripsData.length > 0) ) /*Tehát nem nagyobb, mint 0.*/
    {

      for (let i = 0; i < this.carsData.length; i++){

        const car = this.carsData[i];

        if(car.model == tripData.car)
        {

          isCorrectKM! = car.starting_mileage! + parseInt(tripData.distance); /*Ekkor először veszem fel ezt az autót.*/

          isValidDate = true;

        }

      }

    }


    for (let i = 0; i < this.carsData.length; i++){

      const car = this.carsData[i];

      for (let j = 0; j < this.tripsData.length; j++){

        const trip = this.tripsData[j];

        if(tripData.car == trip.car)
        {

          isThere = true; /*Van legalább egy ilyen autó a Trips-ben.*/

        }
  
        if( (trip.Id! > max && trip.car == tripData.car) && isThere) /*Van már ennek az autónak bejegyzése.*/
        {

          max = trip.Id!;

          isCorrectKM = trip.newMileage! + parseInt(tripData.distance);

          const [Formyear, Formmonth, Formday] = tripData.startDate.split('-'); /*A Form-ból kapott dátumot darabolja fel.*/
          const [DByear, DBmonth, DBday] = trip.startDate!.split('-'); /*Az adatbázisból kapott legfirssebb dátumot darabolja fel.*/

          if(tripData.startDate){

            const FormDate = new Date(parseInt(Formyear), parseInt(Formmonth) - 1, parseInt(Formday)); /*Form dátum létrehozása.*/
            const DBDate = new Date(parseInt(DByear), parseInt(DBmonth) - 1, parseInt(DBday)); /*DB dátum létrehozása.*/

            if(FormDate >= DBDate){

              isValidDate = true;

            }

          }

        }

        if(isThere == false && car.model == tripData.car)
        {

          isCorrectKM = car.starting_mileage! + parseInt(tripData.distance);

          isValidDate = true; /*Hiszen nincsen ilyen autó, tehát első dátum lesz.*/

        }
  
      }

    }

    if( ( isCorrectKM! > tripData.newMileage || isCorrectKM! < tripData.newMileage ) && isThere)
    {

      alert("Az új kilóméteróra-állásnak meg kell egyeznie a már eddig megtett kilóméterrel, valamint a mostani megtett távolság összegével! " + "Ez pontosan: " + isCorrectKM! + " km lenne!"); 

    }

    if( ( isCorrectKM! < tripData.newMileage || isCorrectKM! > tripData.newMileage ) && !isThere )
    {
      alert("Az új kilóméteróra-állásnak meg kell egyeznie a kezdő kilóméterrel, valamint a mostani megtett távolság összegével! " + "Ez pontosan: " + isCorrectKM! + " km lenne!"); 
    }

    if(!isValidDate)
    {
      alert("A megadott dátum az adott autó múltjába mutat!");
    }
    
    if(tripData.newMileage == isCorrectKM! && isValidDate)
    {

      this.tripService.postTrip(tripData).subscribe(() =>{ /*Ha a return='Nem'.*/

        location.reload();

      });

      if(tripData.return == 'Igen') /*Ha pedig 'Igen'.*/
      {

        const tripData = {
          Id: tripForm.value.Id,
          car: tripForm.value.carSelect || this.carsData[0].model,
          driver: tripForm.value.driverSelect || this.driversData[0].name,
          startDate: tripForm.value.startDate,
          tripType: tripForm.value.type,
          startPlace: tripForm.value.endPlace,
          endPlace: tripForm.value.startPlace,
          distance: tripForm.value.distance,
          newMileage: parseInt(tripForm.value.newMileage) + parseInt(tripForm.value.distance),

        }

        this.tripService.postTrip(tripData).subscribe(() =>{

          location.reload();

        });;

      }
    }

  }

  changeTrip(tripsData: Trip){

    this.isVisibleChangeForm = true;

    this.selectedTrip = [tripsData];
  }

  saveTripChanges(selectedTrip: Trip){

    const tripData = {
      Id: selectedTrip.Id,
      car: selectedTrip.car || this.carsData[0].model,
      driver: selectedTrip.driver || this.driversData[0].name,
      startDate: selectedTrip.startDate,
      tripType: selectedTrip.tripType,
      startPlace: selectedTrip.startPlace,
      endPlace: selectedTrip.endPlace,
      distance: selectedTrip.distance,
      newMileage: selectedTrip.newMileage,

    }

    let isCorrectKM_MAX: number;
    let isCorrectKM_MIN: number;
    let isCorrectKM: boolean;
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    let previousKM: number;

    for (let i = 0; i < this.carsData.length; i++){

      const car = this.carsData[i];

      for (let j = 0; j < this.tripsData.length; j++){

        const trip = this.tripsData[j];

        if( ( trip.Id! < min && trip.Id! > tripData.Id! ) && trip.car == tripData.car ) /*Az aktuális id-val rendelkező autó után következő legkisebb id-t keresem, ahol ugyanez az autó van.*/
        {

          min = trip.Id!;

          if(isCorrectKM_MIN! !== undefined) /*Azért kell, hogy kiszűrjem az első autót az 'else' részben.*/
          {

            isCorrectKM_MAX = trip.newMileage!; /*Ennél kisebbnek kell lennie az új értéknek!*/

          }
          else /*Ezen az oldalon kezelem azt, ha ő az első ilyen autó.*/
          {

            if(isCorrectKM_MAX! + Number(tripData.distance!) == tripData.newMileage)
            {

              isCorrectKM = true;

            }

          }
          

        }

        if( ( trip.Id! > max && trip.Id! < tripData.Id! ) && trip.car == tripData.car )
        {

          max = trip.Id!;

          previousKM = trip.newMileage!;

          if(isCorrectKM_MAX! !== undefined) /*Van rákövetkező ilyen autó.*/
          {

            isCorrectKM_MIN = trip.newMileage!; /*Ennél nagyobbnak kell lennie az új értéknek!*/

          }
          else /*Nincs utána következő ilyen autó.*/
          {

            isCorrectKM_MIN! = previousKM!;

            if(isCorrectKM_MIN! + Number(tripData.distance!) == tripData.newMileage)
            {
            
                isCorrectKM = true;
    
            }

          }

        }

        if(isCorrectKM_MAX! == undefined && isCorrectKM_MIN! == undefined) /*Tehát ő az egyedüli ilyen autó az adatbázisban. Se előtte, se utána nincs hasonló.*/
        {

          if(car.starting_mileage! +  Number(tripData.distance!) == tripData.newMileage )
          {

            isCorrectKM = true;

          }

        }

      }

    }

    if( ( ( ( (tripData.newMileage! > isCorrectKM_MIN!) && (tripData.newMileage! < isCorrectKM_MAX!) ) && isCorrectKM! ) || ( (isCorrectKM_MIN! == undefined) && (tripData.newMileage! < isCorrectKM_MAX!) ) || ( (tripData.newMileage! > isCorrectKM_MIN!) && (isCorrectKM_MAX! == undefined) && (isCorrectKM!)  ) || ( ( ( isCorrectKM_MAX! == undefined ) && ( isCorrectKM_MIN! == undefined ) ) && isCorrectKM! ) ) || (isCorrectKM_MIN! == undefined && isCorrectKM! ) )
    {

      const index = this.tripsData.findIndex((x) => x.Id == selectedTrip.Id);

      if (index > -1) {
        this.tripService.updateTrip(selectedTrip).subscribe(() => {
            this.tripService.getTrip().subscribe((data: Trip[]) => { /*Így egyből lefrissül.*/
              this.tripsData = data;
              this.hideChangesForm();
            });
          });
      }

    }
    else
    {

      if( (isCorrectKM_MIN! == undefined  && isCorrectKM_MAX! !== undefined) && !isCorrectKM!) /*Ekkor ő az első elem, nincs őt megelőző.*/
      {

        alert("Az új kilóméteróra-állásnak " + ((isCorrectKM_MAX!) + Number(tripData.distance)) + " km kell lennie! ");
        location.reload();

      }
      else if( (isCorrectKM_MAX! == undefined && isCorrectKM_MIN! !== undefined) && !isCorrectKM!) /*Ő az utolsó elem az adott autóból, nincs őt követő.*/
      {

        alert("Az új kilóméteróra-állásnak " + (Number(isCorrectKM_MIN!) + Number(tripData.distance)) + " km kell lennie! ");
        location.reload();

      }
      else if( (isCorrectKM_MAX! == undefined && isCorrectKM_MIN! == undefined) && !isCorrectKM!)
      {

        alert("A kilóméteróra-állásának a kezdő kilóméteróra-állás, valamint a megtett távolság összegének kellene lennie!");
        location.reload();

      }
      else if(!isCorrectKM!) /*Ilyenkor helytelen a távolság + új kilóméteróra-állás.*/
      {

        alert("Irreális kilóméter-állás ezzel a megtett távolsággal! Helyesen: " + (isCorrectKM_MIN! + Number(tripData.distance!) ) );
        location.reload();

      }
      else
      {

        alert("A megadott " + tripData.newMileage + " km nem a már meglévő értékek között van! ( " +  isCorrectKM_MIN! + " km - " + isCorrectKM_MAX! + " km )");
        location.reload();

      }

    }

  }

  hideChangesForm(){

    this.isVisibleChangeForm = false;

  }

}
