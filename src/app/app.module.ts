import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { CityListComponent } from './city-list/city-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AppConfigService } from './app-config.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CityListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
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
          return appConfigService.loadAppConfig()
            .then(() => authService.checkLogin());
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
