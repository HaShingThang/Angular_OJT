import { Component } from '@angular/core';
import {
    FormControl,
    Validators,
    FormGroup,
    AbstractControlOptions,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {
    roles: Role[] = [
        { value: 'Manager' },
        { value: 'Member' },
        { value: 'User' },
    ];

    registerForm: FormGroup | any;
    hide: boolean = true;

    constructor(private router: Router) {
        this.registerForm = new FormGroup(
            {
                name: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z.]{3,40}$'),
                ]),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                    Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
                ]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.pattern(
                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
                    ),
                ]),
                confirmPass: new FormControl('', [
                    Validators.required,
                    Validators.pattern(
                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
                    ),
                ]),
                gender: new FormControl('', [
                    Validators.required,
                ]),
                team: new FormControl('', [
                    Validators.required
                ]),
                role: new FormControl('', [
                    Validators.required
                ]),
                hobby: new FormControl('', [
                    Validators.required,
                ]),
                dob: new FormControl('', [
                    Validators.required
                ])
            },
            { validators: this.passwordMatchValidator } as AbstractControlOptions
        );
    }
    passwordMatchValidator(control: FormGroup) {
        const password = control.get('password');
        const cpassword = control.get('confirmPass');
        return password && cpassword && password.value !== cpassword.value
            ? { passwordMismatch: true }
            : null;
    }

    get getConfirmPassword() {
        return this.registerForm.get('confirmPass');
    }

    ngOnInit(): void { }

    onSubmit() {
        if (!this.registerForm.valid) {
            return;
        }
    }
}

function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (
            matchingControl.errors &&
            !matchingControl.errors['confirmedValidator']
        ) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
