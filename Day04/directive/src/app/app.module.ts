import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoParentComponent } from './components/todo-parent/todo-parent.component';
import { TodoChildComponent } from './components/todo-child/todo-child.component';
import { HightlightDirective } from './directives/hightlight.directive';

@NgModule({
    declarations: [
        AppComponent,
        TodoParentComponent,
        TodoChildComponent,
        HightlightDirective
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
