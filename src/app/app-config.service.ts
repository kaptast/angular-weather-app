import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) { }

  // Loads the config.json
  // Runs at app initialization
  loadAppConfig() {
    console.log('Getting config');
    
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        console.info('Config loaded!');
        this.appConfig = data;
      });
  }

  // Gets the Base API url set in config.json
  weatherApiKey() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.weatherApiKey;
  }
}
