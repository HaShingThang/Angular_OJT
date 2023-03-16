import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor() { }

    isLoggedIn(): boolean {
        let user = JSON.parse(localStorage.getItem('user') || '{}')
        return user.isLoggedIn
    }

    isLoggedUser(loginEmail: string) {
        let { email } = JSON.parse(localStorage.getItem('user') || '{}')
        let user = loginEmail === email
        return !!user;
    }
}
