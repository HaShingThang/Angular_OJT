import { Component } from '@angular/core';
import { Subject, from, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.css'],
})
export class SubjectComponent {
    isRun: boolean = false;

    runSubject(val: boolean) {
        this.isRun = !val;
        if (this.isRun) {
            //Subject
            const subject = new Subject<number>();

            //BehaviorSubject
            // const subject = new BehaviorSubject(0);

            // ReplaySubject
            // const subject = new ReplaySubject(2);

            subject.subscribe({
                next: (v) => console.log(`observer A: ${v}`),
            });

            subject.subscribe({
                next: (v) => console.log(`observer B: ${v}`),
            });

            subject.next(1);
            subject.next(2);
            subject.next(3);

            subject.subscribe({
                next: (v) => console.log(`observer C: ${v}`),
            });

            subject.next(4);

            const observable = from([1, 2, 3]);
            //Since a Subject is an Observer,
            //This also means you may provide a Subject as the argument to the subscribe of any Observable
            observable.subscribe(subject);

            subject.subscribe({
                next: (v) => console.log(`observer C: ${v}`),
            });
        } else {
            window.location.reload();
        }
    }
}
