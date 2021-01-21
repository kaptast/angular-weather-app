import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { City } from './city';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService
  ) { }

  getCities(): Observable<City[]> {
    const userid = this.authService.getUserId();
    console.log(userid);
    return this.dbService.getCities(userid);
  }

  addCity(city: City): Observable<City> {
    const userid = this.authService.getUserId();
    city.userid = userid;
    return this.dbService.addCity(city);
  }

}
