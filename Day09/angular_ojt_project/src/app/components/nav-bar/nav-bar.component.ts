import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent {
    constructor(public authService: AuthService, private router: Router) { }

    logout() {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'warning',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            showCloseButton: true,
            reverseButtons: true,
            confirmButtonColor: '#0c0246',
            cancelButtonColor: '#808080',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                this.router.navigate(['/login']);
            }
        });
    }
}
