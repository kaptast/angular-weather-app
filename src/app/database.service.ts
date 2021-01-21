import { Injectable } from '@angular/core';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { City } from './city';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private dbService: NgxIndexedDBService
  ) { }

  addUser(username: string, hashedPassword: string): Observable<number> {
    return this.dbService.add('users', {
      username: username,
      password: hashedPassword
    })
  }

  getUser(username: string): Observable<User> {
    return this.dbService.getByIndex('users', 'username', username);
  }

  addCity(city: City): Observable<any> {
    return this.dbService.add('cities', city);
  }

  getCities(userid: string): Observable<City[]> {
    return this.dbService.getAllByIndex('cities', 'userid', IDBKeyRange.only(userid));
  }

  deleteCity(cityid: number): Observable<any> {
    return this.dbService.delete('cities', cityid);
  }
}
