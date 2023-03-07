import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateComponent } from './components/fruits/create/create.component';
import { EditComponent } from './components/fruits/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            role: 'ROLE_ADMIN',
        },
    },
    {
        path: 'admin/fruits/create',
        component: CreateComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
    },
    {
        path: "admin/fruits/edit/:id",
        component: EditComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' }
    },
    {
        path: 'user',
        component: UserDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            role: 'ROLE_USER',
        },
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
