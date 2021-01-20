import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, of } from 'rxjs';
import { City } from './city';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  configurateDatabase(): void {
    openDB('weather_db', 1, {
      upgrade(db) {
        const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        userStore.createIndex('username', 'username', { unique: true });

        const cityStore = db.createObjectStore('cities', { keyPath: 'id', autoIncrement: true });
        cityStore.createIndex('userid', 'userid');
      }
    })
  }

  async registerUser(user: User): Promise<void> {
    const db = await openDB('weather_db', 1);

    db.add('users', user)
      .catch(console.error);
  }

  async getUser(username: string): Promise<Observable<User>> {
    const db = await openDB('weather_db', 1);

    db.getAllFromIndex('users', 'username', username)
      .then(user => {
        return user;
      })
      .catch(console.error);

    return of(null); 1
  }

  async addCity(city: City): Promise<void> {
    const db = await openDB('weather_db', 1);

    db.add('cities', city)
      .catch(console.error);
  }

  async deleteCity(cityId: number): Promise<void> {
    const db = await openDB('weather_db', 1);

    db.delete('cities', cityId)
      .catch(console.error);
  }

  async getCities(userid: number): Promise<Observable<City[]>> {
    const db = await openDB('weather_db', 1);

    await db.getAllFromIndex('cities', 'userid', userid)
      .then(userCities => {
        return userCities;
      })
      .catch(console.error);

    return of([]);
  }
}
