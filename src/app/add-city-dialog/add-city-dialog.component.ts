import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})
export class AddCityDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    private cityService: CityService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  addCity(cityname: string): void {
    cityname = cityname.trim();
    if (!cityname) {
      return;
    }

    this.cityService.addCity({ cityname } as City)
      .subscribe(_ => {
        console.log('city added');
        this.dialogRef.close();
      })
  }
}
