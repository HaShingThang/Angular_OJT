import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    roles: Role[] = [
        { value: "Manager" },
        { value: "Member" },
        { value: "User" }
    ]
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    email = new FormControl('', [Validators.required, Validators.email]);
    hide = true;

    getNameError() {
        if (this.name.hasError('required')) {
            return 'You must enter a name';
        }
        return this.name.hasError('minLength') ? 'Name should be more than 3 characters' : '';
    }

    getEmailError() {
        if (this.email.hasError('required')) {
            return 'Enter your email';
        }
        return this.email.hasError('email') ? 'Email is not valid.' : '';
    }
}
