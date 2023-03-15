import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
    AbstractControlOptions,
} from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { Role } from 'src/app/interfaces/role.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

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
        private formBuilder: FormBuilder,
        private users: UserService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.userId = params['id'];
            const usersData = this.users.getUsers()
            if (usersData) {
                const users: User[] = JSON.parse(usersData);
                this.userData = users.find((user) => user.id === +this.userId);
            }
            this.editUserForm = this.formBuilder.group({
                name: [this.userData.name, Validators.required],
                email: [this.userData.email, [Validators.required, Validators.email]],
                password: [
                    this.userData.password,
                    [
                        Validators.required,
                        Validators.pattern(
                            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
                        ),
                    ],
                ],
                confirmPass: [
                    this.userData.confirmPass,
                    [
                        Validators.required,
                        Validators.pattern(
                            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,8}$'
                        ),
                    ],
                ],
                gender: [this.userData.gender, Validators.required],
                team: [this.userData.team, Validators.required],
                role: [this.userData.role, Validators.required],
                hobby: this.formBuilder.array(this.userData.hobby, Validators.required),
                dob: [this.userData.dob, Validators.required],
                desc: [this.userData.desc, Validators.maxLength(1500)],
                createdAt: [this.userData.createdAt, Validators.required],
            }, { validators: this.passwordMatchValidator } as AbstractControlOptions);
        });
    }

    passwordMatchValidator(control: FormGroup) {
        const password = control.get('password');
        const cpassword = control.get('confirmPass');
        if (password && cpassword && password.value !== cpassword.value) {
            cpassword.setErrors({ passwordMismatch: true });
        } else {
            cpassword!.setErrors(null);
        }
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
        const users: User[] = JSON.parse(this.users.getUsers() || '[]');
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
            showConfirmButton: false,
            timer: 1500,
        });
        this.router.navigate(['/user-list']);
    }
}
