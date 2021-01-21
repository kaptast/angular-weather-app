import { Component, Input, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() city: City;


  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.getCityData();
  }

  private getCityData(): void {
    this.cityService.getCityData(this.city.cityname)
      .subscribe(data => {
        this.city.main = { 
          temp: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure
        };
        this.city.wind = {
          speed: data.wind.speed,
          deg: data.wind.deg
        }
      })
  }

  deleteCity(): void {
    this.cityService.delete(this.city.id)
  }

  degToCompass(num: number) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }
}
