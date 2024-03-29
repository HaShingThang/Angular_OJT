import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SubjectComponent } from './components/subject/subject.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        NotFoundComponent,
        HomeComponent,
        SideBarComponent,
        OperatorsComponent,
        SubscriptionComponent,
        SubjectComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})

export class AppModule { }
