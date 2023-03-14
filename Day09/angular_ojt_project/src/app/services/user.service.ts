import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor() { }

    getUsers() {
        return localStorage.getItem('users')
    }
}
