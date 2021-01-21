import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { User } from './user';
import { sha512 } from 'js-sha512';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggenIn: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  checkLogin() {
    console.log('checking login');
    const token: string = localStorage.getItem('user_token');
    const userId: string = localStorage.getItem('user_id');

    if (userId && token) {
      this.isLoggenIn = true;
    } else {
      this.isLoggenIn = false;
    }
  }

  getUserId() {
    const userid = localStorage.getItem('user_id');

    if (userid) {
      return userid;
    }

    return '0';
  }

  login(username: string, password: string): void {
    this.databaseService.getUser(username)
      .subscribe(user => {
        const hashedPassword = this.hashPassword(password);
        if (user) {
          if (user.password === hashedPassword) {
            this.isLoggenIn = true;
            this.setSession(user.id);
          } else {
            this.openSnackBar();
            this.removeSession();
            this.isLoggenIn = false;
          }
        } else {
            this.databaseService.addUser(username, hashedPassword)
              .subscribe(userid => {
                this.isLoggenIn = true;
                this.setSession(userid);
              })
          }
      });
  }

  logout(): Observable<boolean> {
    this.removeSession();
    this.isLoggenIn = false;
    return of(true);
  }

  private hashPassword(password: string): string {
    return sha512(password);
  }

  private setSession(userid: number): void {
    const userToken = this.generateToken();

    localStorage.setItem('user_id', userid.toString());
    localStorage.setItem('user_token', userToken);
  }

  private removeSession(): void {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
  }

  private generateToken(): string {
    return this.makeid(30);
  }

  private makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  private openSnackBar(): void {
    this.snackBar.open('Invalid credentials!', 'Close', {
      duration: 5000,
      panelClass: ['alert-snackbar']
    });
  }
}
