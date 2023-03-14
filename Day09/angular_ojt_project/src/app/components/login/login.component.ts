import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
    loginForm: FormGroup | any;
    hide: boolean = true;
    invalidUser!: string;

    constructor(private authService: AuthService, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.pattern('[a-z0-9].+@[a-z]+.[a-z]{2,3}'),
            ]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/user-list']);
        }
    }

    checkUser(email: string, password: string): boolean {
        let users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
        let user = users.find((u) => u.email === email && u.password === password);
        return !!user;
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            if (
                this.checkUser(
                    this.loginForm.value.email,
                    this.loginForm.value.password
                )
            ) {
                this.router.navigate(['/user-list']);
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                Swal.fire({
                    title: 'Invalid email or password.',
                    icon: 'info',
                    customClass: {
                        confirmButton: 'btn-custom-color',
                    },
                });
            }
        }
    }
}
