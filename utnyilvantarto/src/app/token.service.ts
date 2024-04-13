import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { RegistrationService } from './registration/registration.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private registrationtService: RegistrationService) { }

  checkTokenValidity(): Observable<boolean> {
    const loggedInUserData = localStorage.getItem('jwtToken');

    if (loggedInUserData && loggedInUserData.length > 0) {
      const decodedToken: any = jwtDecode(loggedInUserData);
      const expirationTime = decodedToken.exp * 1000;

      if (expirationTime > Date.now()) {
        return this.registrationtService.callProtectedEndpoint(loggedInUserData).pipe(
          catchError(error => {
            console.error(error);
            console.log('Érvénytelen.');
            return of(false);
          })
        );
      } else {
        console.log("A token lejárt.");
        return of(false);
      }
    } else {
      console.log('Nincs érvényes token.');
      return of(false);
    }
  }
  
}
