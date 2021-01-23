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
  cities: City[];

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService,
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) { }

  getCities(): void {
    const userid = this.authService.getUserId();
    
    this.dbService.getCities(userid)
      .subscribe(cities => {
        this.cities = cities;
      })
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

  getForecastData(cityname): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=${this.appConfigService.weatherApiKey()}`;
    return this.http.get(url);
  }

  delete(cityid: number): void {
    this.dbService.deleteCity(cityid)
      .subscribe(_ => {
        this.getCities();
      })
  }
}
