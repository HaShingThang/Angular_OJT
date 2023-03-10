import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    loginForm: FormGroup | any;
     hide: boolean = true
    constructor(
        private router: Router
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
                '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
            ),]),
            password: new FormControl('', [Validators.required, Validators.pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
            )])
        });
    }
    ngOnInit(): void {
    }
    onSubmit() {
        if (!this.loginForm.valid) {
            return;
        }
        localStorage.setItem('user', JSON.stringify(this.loginForm.value))
    }
}