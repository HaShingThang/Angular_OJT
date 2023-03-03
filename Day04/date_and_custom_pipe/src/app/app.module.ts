import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { DatePipeComponent } from './components/date-pipe/date-pipe.component';
import { UsdMmkPipe } from './pipes/usd-mmk.pipe';
import { UsdMmkComponent } from './components/usd-mmk/usd-mmk.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        DatePipeComponent,
        DatePipeComponent,
        UsdMmkPipe,
        UsdMmkComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
       
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
