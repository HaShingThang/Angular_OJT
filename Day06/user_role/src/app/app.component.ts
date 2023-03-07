import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export interface RoleResuest {
    success: boolean;
    role: string;
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    title = 'ng-guard';

    isAdmin!: string

    constructor(private router: Router, public authService: AuthService) {
        if (authService.isLoggedIn()) {
            if (authService.getRole() === 'ROLE_ADMIN') {
                router.navigate(['/admin'])
            } else {
                router.navigate(['/user'])
            }
        }
    }

    ngOnInit(): void { }

    login(val: string) {
        this.authService.login(val)
            .subscribe();
        if (val === 'ROLE_ADMIN') {
            this.router.navigate(['/admin'])
        } else if (val === 'ROLE_USER') {
            this.router.navigate(['/user'])
        } else {
            this.router.navigate(['/login'])
        }
    }

    logout() {
        this.authService.logout()
            .subscribe(res => {
                if (!res.success) {
                    this.router.navigate(['/']);

                }
            });
    }

    goToDashBoard() {
        let role = this.authService.getRole();
        if (role === 'ROLE_ADMIN')
            this.router.navigate(['admin']);
        if (role === 'ROLE_USER')
            this.router.navigate(['/user']);
    }
}