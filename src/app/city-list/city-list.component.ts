import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[];

  constructor(
    private cityService: CityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  private getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  addCity(cityname: string): void {
    cityname = cityname.trim();
    if (!cityname) {
      return;
    }

    this.cityService.addCity({ cityname } as City)
      .subscribe(_ => {
        console.log('city added');
        this.getCities();
      })
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
