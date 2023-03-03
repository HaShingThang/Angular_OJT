import { Component } from '@angular/core';

@Component({
    selector: 'app-date-pipe',
    templateUrl: './date-pipe.component.html',
    styleUrls: ['./date-pipe.component.css']
})

export class DatePipeComponent {
    now = new Date()
}
