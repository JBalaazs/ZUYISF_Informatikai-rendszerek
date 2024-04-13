import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService } from './report.service';
import { Car } from '../../../server/src/entity/Car';
import { NgForm } from '@angular/forms';
import { Trip } from '../../../server/src/entity/Trip';
import { Report } from '../models/Report';
import { ReportPlaces } from '../models/ReportPlaces';
import { ReportDates } from '../models/ReportDates';
import { ReportKM } from '../models/ReportKM';
import { TokenService } from '../token.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  carsData: Car[] = [];

  tripData: Trip[] = [];

  summary: Report[] = []; /*Összegzés az adatok kiírásához.*/ 
  
  defaultPlate: string = '';
  defaultDate: string = '';

  CollectPlaces: ReportPlaces[] = [];

  dates: ReportDates[] = [];

  isSearch: boolean = false;

  distanceMIN: number = 0;

  MinMax: ReportKM[] = [];

  isLogged: boolean = false;

  ngOnInit(): void {
      
    this.reportService.getCars().subscribe((data: Car[]) => {
      this.carsData = data;
      
      if(this.carsData.length > 0 && this.carsData[0].license_plate !== undefined){
        this.defaultPlate = this.carsData[0].license_plate;
      }

      this.tokenService.checkTokenValidity().subscribe(isLogged => { /*token.service.ts*/
        if (isLogged) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      });

    });

    this.reportService.getTrip().subscribe((data: Trip[]) => {
      this.tripData = data;

      this.tripData.forEach(trip =>{ /*A legördülőbe ki kell válogatni a lehetséges év-hónap párosokat.*/

        const startDate = trip.startDate;

        if(startDate){
  
          const [year, month, day] = startDate.split('-');
  
          const newDates: ReportDates ={
            dates: year + "-" + month,
          }
  
          if(!this.dates.some(date => date.dates === newDates.dates))
          {
            this.dates.push(newDates);
            this.defaultDate = this.dates[0].dates;
          }
  
        }

      });


    });

    this.tokenService.checkTokenValidity(); /*token.service.ts.*/

  }

  constructor(private reportService: ReportService, private tokenService: TokenService) { }

  search(reportForm: NgForm){

    const inputDate = this.defaultDate;
    const [year, month] = inputDate.split('-');

    let max: number = Number.MIN_VALUE; /*Kezdeti értékek beállítása.*/
    let min: number = Number.MAX_VALUE;

    let sumPrivate: Report = this.createReport(min, max, '', '', '');
    let sumCompany: Report = this.createReport(min, max, '', '', '');

      this.tripData.forEach(trip =>{

        if(trip.startDate){

          const [Tripyear, Tripmonth, Tripday] = trip.startDate.split('-');

          this.carsData.forEach(car =>{

            if( (reportForm.value.plateSelect == car.license_plate) && (car.model == trip.car) && (year == Tripyear && month == Tripmonth) ) /*Rászűrtem a lekérdezett időpontban az adott rendszámos autóra.*/
            {

                 /*Havi lebontásba a futott kilómétert.*/
                  if( (trip.newMileage! > max && car.model == trip.car) ){

                    max = trip.newMileage!;

                  }

                  if(trip.newMileage! < min && car.model == trip.car){

                    min = trip.newMileage!;
                    this.distanceMIN = trip.distance!;

                  }

                const newMinMax: ReportKM = {

                  minKM: min,
                  maxKM: max,

                }

                const newPlaces: ReportPlaces = { /*Begyűjtjük az összes helyszínt.*/

                  startPlace: trip.startPlace!,
                  endPlace: trip.endPlace!,

                }

                if(trip.tripType == "Magán"){
                  sumPrivate.distancePrivate += trip.distance!;

                  sumPrivate.consumptionPrivate += ((trip.distance! * car.consumption!)/100) * 480;

                  sumPrivate.flatRatePrivate += trip.distance! * 10;
                  
                  sumPrivate.allCostPrivate = sumPrivate.consumptionPrivate + sumPrivate.flatRatePrivate!;

                  sumPrivate.tripType = "Magán";

                }
                else{
                  sumCompany.distanceCompany += trip.distance!;

                  sumCompany.consumptionCompany += ((trip.distance! * car.consumption!)/100) * 480; 

                  sumCompany.flatRateCompany += trip.distance! * 10;

                  sumCompany.allCostCompany = sumCompany.consumptionCompany + sumCompany.flatRateCompany!;

                  sumCompany.tripType = "Céges";
                }
                

                this.summary.push(sumPrivate);
                this.summary.push(sumCompany);
                this.CollectPlaces.push(newPlaces);
                this.MinMax.push(newMinMax);
                this.isSearch = true;

            }

          });

        }

      });

      if(this.MinMax[0].maxKM == this.MinMax[0].minKM) /*Tehát az autónak csak egy bejegyzése van, akkor is tudnom kellene, hogy mennyit ment a hónapban.*/
      {

         this.MinMax[0].minKM -= this.distanceMIN;

      }

  }

  newSearch(){
    location.reload();
  }

  createReport(startMileage: number, endMileage: number, startPlace: string, endPlace: string, tripType: string): Report{
      
    return {
        startMileage: startMileage,
        endMileage:endMileage,
        startPlace: startPlace,
        endPlace: endPlace,
        tripType: tripType,
        distancePrivate: 0,
        consumptionPrivate: 0,
        flatRatePrivate: 0,
        allCostPrivate: 0,
        distanceCompany: 0,
        consumptionCompany: 0,
        flatRateCompany: 0,
        allCostCompany: 0
    };

  }

}
