import { Component, OnInit, Input } from '@angular/core';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-chart',
  templateUrl: './city-chart.component.html',
  styleUrls: ['./city-chart.component.css']
})
export class CityChartComponent implements OnInit {
  @Input() cityname: string;
  forecastData: any[];
  view: any[] = [800, 300];  

  constructor(
    private cityService: CityService
  ) {
    this.forecastData = [];
  }

  ngOnInit(): void {
    this.getCityData();
  }

  getCityData(): void {
    this.cityService.getForecastData(this.cityname)
      .subscribe(data => {
        this.forecastData.push({
          'name': this.cityname,
          'series': this.transformData(data)
        });
        console.log(this.forecastData);
      })
  }

  private transformData(data): any[] {
    return data.list.map(obj => {
      let rObj = {};
      rObj["name"] = obj.dt_txt;
      rObj["value"] = obj.main.temp;
      return rObj;
    });
  }

  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Temperature';

  colorScheme = {
    domain: ['#5AA454']
  };

}
