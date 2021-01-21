import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { City } from './city';
import { DatabaseService } from './database.service';
import { HttpClient} from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService,
    private http: HttpClient,
    private appConfigService: AppConfigService
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

  getCityData(cityname): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${this.appConfigService.weatherApiKey()}`;
    return this.http.get(url);
  }
}
