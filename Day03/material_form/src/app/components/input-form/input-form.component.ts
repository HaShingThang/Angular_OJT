import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'app-input-form',
	templateUrl: './input-form.component.html',
	styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
	signin: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)])
	});

	hide = true;

	get emailInput() {
		return this.signin.get('email')
	}

	get passwordInput() {
		return this.signin.get('password')
	}
}
