import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './car-register.service';
import { Car } from '../../../server/src/entity/Car';

@Component({
  selector: 'app-car-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-register.component.html',
  styleUrl: './car-register.component.css'
})
export class CarRegisterComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void{
    this.carService.getCars().subscribe((data: Car[]) =>{
      this.cars = data;
    });
  }
 
}
