import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-todo-child',
    templateUrl: './todo-child.component.html',
    styleUrls: ['./todo-child.component.css']
})

export class TodoChildComponent {
    @Input() name: string = ''

}
