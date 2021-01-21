import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { City } from '../city';
import { CityService } from '../city.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  constructor(
    private cityService: CityService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  cities(): City[] {
    return this.cityService.cities;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed()
      .subscribe(_ => {
        this.getCities();
      })
  }

  private getCities(): void {
    this.cityService.getCities();
  }
  logout(): void {
    this.authService.logout().subscribe();
  }
}
