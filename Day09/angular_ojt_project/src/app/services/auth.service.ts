import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLogin = false;

  constructor() { }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn == 'true') this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }
}
