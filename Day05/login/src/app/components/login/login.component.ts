import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private router: Router) { }
  
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

  isLoggedIn: boolean = false;
  invalid: string = ''

  onRegisterSubmit() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard'])
    } else {
      this.invalid = "Invalid Email or Password"
      this.router.navigate(['/'])
    }
  }
}
