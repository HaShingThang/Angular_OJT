
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class RegisterModel {
    name?: string;
    email?: string;
    password?: string;
}

export interface UserInfo {
    name?: string;
    email?: string;
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    userInfo?: UserInfo;
    user: RegisterModel = new RegisterModel();
    registerForm: FormGroup;
    hide = true;

    constructor(private formBuilder: FormBuilder) {
        this.registerForm = this.formBuilder.group({
            'name': [this.user.name, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(44)
            ]],
            'email': [this.user.email, [
                Validators.required,
                Validators.email
            ]],
            'password': [this.user.password, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ]]
        });
    }

    onRegisterSubmit() {
        this.userInfo = { name: this.user.name, email: this.user.email }
        this.registerForm.reset()
    }
}