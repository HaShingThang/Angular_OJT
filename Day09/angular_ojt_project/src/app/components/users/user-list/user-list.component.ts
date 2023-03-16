import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
    dataSource!: MatTableDataSource<User>;
    userData!: User[];
    screenWidth!: number;

    displayedColumns: string[] = [
        'no',
        'name',
        'email',
        'gender',
        'team',
        'role',
        'hobby',
        'dob',
        'createdAt',
        'actions',
    ];

    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private users: UserService,
        public loggedUser: AuthService
    ) {
        const usersData: any = this.users.getUsers();
        if (usersData) {
            this.userData = JSON.parse(usersData);
        }
        this.dataSource = new MatTableDataSource(this.userData);
    }

    ngOnInit(): void {
        const users: any = this.users.getUsers();
        if (users !== null) {
            this.userData = JSON.parse(users);
        }

        this.dataSource.paginator = this.paginator;

        this.screenWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.screenWidth = window.innerWidth;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onDelete(user: User): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                message: `Are you sure you want to delete ${user.name}?`,
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                const index = this.dataSource.data.findIndex((u) => u.id === user.id);
                if (index >= 0) {
                    this.dataSource.data.splice(index, 1);
                    this.userData = this.userData.filter((u) => u.id !== user.id);
                    localStorage.setItem('users', JSON.stringify(this.dataSource.data));
                    this.dataSource._updateChangeSubscription();
                }
                Swal.fire({
                    title: `Deleted "${user.name}" Successfully`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }
}
