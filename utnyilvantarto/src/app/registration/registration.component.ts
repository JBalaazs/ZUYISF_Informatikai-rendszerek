import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { User } from '../models/User';
import { AuthResponse } from '../models/AuthResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  regDatas: User[] = [];

  constructor(private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
      
    this.registrationService.getUser().subscribe((data: User[]) => {
      this.regDatas = data;
    });

  }

  registration(registerForm: NgForm){

    let foundDuplicate = false;

    const userData = {

      Id: registerForm.value.Id,
      username: registerForm.value.username,
      password: registerForm.value.password,

    }

    this.regDatas.forEach(users =>{ /*Ha nincs azonos regisztrált név.*/

      if(users.username == userData.username)
      {

        foundDuplicate = true;

      }

    }); 

    if(foundDuplicate){

      alert("Ez a felhasználónév már foglalt!");

    }
    else
    {

      alert("Sikeres regisztráció!");

      this.registrationService.postReg(userData).subscribe((response: AuthResponse) =>{ 

        this.registrationService.saveJWT(response.jwtToken);
        
        this.router.navigate(['/drivers']);

      });

    }


  }

  login(registerForm: NgForm){

    let foundProfile = false;

    const userData = {

      Id: registerForm.value.Id,
      username: registerForm.value.username,
      password: registerForm.value.password,

    }

    this.regDatas.forEach(users =>{

      if(users.username == userData.username && users.password == userData.password)
      {

        foundProfile = true;

      }

    }); 

    if(foundProfile)
    {

      this.registrationService.login(userData).subscribe(
        (response: AuthResponse) => {
          this.registrationService.saveJWT(response.jwtToken);
          
          alert("Sikeres bejelentkezés!");
          this.router.navigate(['/drivers']);
          
        }
      )

    }
    else
    {

      alert("Sikertelen bejelentkezés!");

    }

  }

  logout(registerForm: NgForm){

    localStorage.removeItem("jwtToken");

  }

}
