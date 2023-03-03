import { Component } from '@angular/core';

export const users = [
    { name: 'Joseph', address: "Mdy" },
    { name: 'Michael', address: "Ygn" },
    { name: 'John', address: "Ygn" },
    { name: 'Bosco', address: "Mdy" },
];

@Component({
    selector: 'app-todo-parent',
    templateUrl: './todo-parent.component.html',
    styleUrls: ['./todo-parent.component.css'],
})

export class TodoParentComponent {
    users = users
    color = '';
}
