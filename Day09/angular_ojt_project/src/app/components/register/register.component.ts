import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role.interface';
import { AuthService } from 'src/app/services/auth.service';


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
  hobbies: Array<any> = [
    { value: 'Reading' },
    { value: 'Swimming' },
    { value: 'Cooking' },
  ];
  registerForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9].+@[a-z]+.[a-z]{2,3}'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
          ),
        ],
      ],
      confirmPass: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
        ),
      ]),
      gender: ['', Validators.required],
      team: ['Wordpress', Validators.required],
      role: ['', Validators.required],
      hobby: this.fb.array([], [Validators.required]),
      dob: ['', Validators.required],
      desc: ['', [Validators.maxLength(1500)]]
    }, { validators: this.passwordMatchValidator } as AbstractControlOptions);
  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const cpassword = control.get('cpassword');
    return password && cpassword && password.value !== cpassword.value ? { passwordMismatch: true } : null;
  }

  onCheckboxChange(event: MatCheckboxChange) {
    const checkArray: FormArray = this.registerForm.get('hobby') as FormArray;
    if (event.checked) {
      checkArray.push(new FormControl(event.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == event.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get getConfirmPassword() {
    return this.registerForm.get('confirmPass')
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      let users: any[] = JSON.parse(localStorage.getItem('users') ?? '[]');
      const now = new Date();
      const createdAt = this.datePipe.transform(now, 'yyyy/MM/dd hh:mm a');
      let userData = [
        { id: users.length + 1, ...this.registerForm.value, createdAt },
      ];
      users.push(...userData);
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/login']);
    }
  }
}
