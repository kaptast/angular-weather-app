import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { CityListComponent } from './city-list/city-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

import { MaterialModule } from './material/material.module';
import { AppConfigService } from './app-config.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { GaugeComponent } from './gauge/gauge.component';

const dbConfig: DBConfig = {
  name: 'weather-app-db',
  version: 1,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: true } }
    ]
  }, {
    store: 'cities',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'userid', keypath: 'userid', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CityListComponent,
    LoginComponent,
    AddCityDialogComponent,
    GaugeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [
        AppConfigService,
        AuthService
      ],
      useFactory: (
        appConfigService: AppConfigService,
        authService: AuthService
      ) => {
        return() => {
          console.log('init');
          return appConfigService.loadAppConfig()
            .then(() => authService.checkLogin());
            
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
