import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent,
    children: [
      { path: "", redirectTo: "operators", pathMatch: "full" },
      { path: "operators", component: OperatorsComponent },
      { path: "subscription", component: SubscriptionComponent }
    ]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
