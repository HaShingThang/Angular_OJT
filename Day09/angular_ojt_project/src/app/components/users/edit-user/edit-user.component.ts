import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { Role } from 'src/app/interfaces/role.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';

function passwordMatchValidator(form: FormGroup<any>): {
  passwordMismatch: boolean;
} | null {
  const password = form.get('password');
  const confirmPass = form.get('confirmPass');

  if (password && confirmPass && password.value !== confirmPass.value) {
    return { passwordMismatch: true };
  } else {
    return null;
  }
}



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
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

  userId!: number;
  userData: any;
  editUserForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      const usersData = localStorage.getItem('users');
      if (usersData) {
        const users: User[] = JSON.parse(usersData);
        this.userData = users.find((user) => user.id === +this.userId);
      }
      this.editUserForm = this.formBuilder.group({
        name: [this.userData.name, Validators.required],
        email: [this.userData.email, [Validators.required, Validators.email]],
        password: [this.userData.password, [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
          ),
        ],],
        confirmPass: [this.userData.confirmPass, [Validators.required, passwordMatchValidator]],
        gender: [this.userData.gender, Validators.required],
        team: [this.userData.team, Validators.required],
        role: [this.userData.role, Validators.required],
        hobby: this.formBuilder.array(this.userData.hobby, Validators.required),
        dob: [this.userData.dob, Validators.required],
        createdAt: [this.userData.createdAt, Validators.required],
      });
    });
  }

  onCheckboxChange(event: MatCheckboxChange) {
    const checkArray: FormArray = this.editUserForm.get('hobby') as FormArray;
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

  onSubmit() {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user) => {
      if (user.id === +this.userId) {
        return { ...user, ...this.editUserForm.value };
      } else {
        return user;
      }
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    Swal.fire({
      title: 'Updated Successfully',
      icon: 'success',
      customClass: {
        confirmButton: 'btn-custom-color'
      }
    })
    
    this.router.navigate(['/user-list']);
  }
}
