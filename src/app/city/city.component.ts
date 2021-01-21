import { Component, Input, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { Gauge } from '../gauge';

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
        this.city.gauges = [];
        this.city.gauges.push(new Gauge(data.main.temp, 'Temperature', '°C'));
        this.city.gauges.push(new Gauge(data.main.humidity, 'Humidity', '%'));
        this.city.gauges.push(new Gauge(data.main.pressure, 'Pressure', 'hPa'));
        this.city.gauges.push(new Gauge(data.wind.speed, 'Wind speed', 'm/s'));
        this.city.gauges.push(new Gauge(this.degToCompass(data.wind.deg), 'Wind direction', ''));
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
