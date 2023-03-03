import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {
    userName = "Joe"
    isChildDestroyed = false;

    destroy() {
        this.isChildDestroyed = true
    }

    ngOnInit(): void {
        console.log('ngOnInit from the parent component');
    }

    updateUser() {
        this.userName = "Joseph"
    }
}
