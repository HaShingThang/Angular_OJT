import { Component } from '@angular/core';
import { forkJoin, debounceTime, distinctUntilChanged, filter, from, map, Observable, throttleTime, of, distinct } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Aungular Observable Using RxJs - Check Dev Console';

    obs = new Observable((observer) => {
        console.log('Observable Start')
        setTimeout(() => { observer.next("1") }, 1000);
        setTimeout(() => { observer.next("2") }, 2000);
        setTimeout(() => { observer.next("3") }, 3000);
        // setTimeout(() => { observer.error("error emitted") }, 3500);
        setTimeout(() => { observer.next("4") }, 3100);
        setTimeout(() => { observer.next("5") }, 3200);
    }).pipe(
        filter((data: any) => data > 2),
        map((val) => { return val as number * 2 }),
        // debounceTime(100)
        throttleTime(10)
        // distinctUntilChanged()
    )
    source = from([
        { name: 'John', age: 20 },
        { name: 'Alek', age: 25 },
        { name: 'Rosy', age: 18 }
    ]);

    example = this.source.pipe(map(({ name }) => name));
    subscribe = this.example.subscribe(val => console.log(val));

    source$ = from([1, 1, 2, 2, 3, 3]);

    ngOnInit() {
        this.obs.subscribe(
            val => { console.log(val) },
            error => { console.log("error") },
            () => { console.log("Completed") }
        )

        this.source$
            .pipe(distinctUntilChanged())
            .subscribe(val => console.log("DistinctUntilChanged", val)); //Output: 1, 2, 3

        of(1, 2, 3, 4, 5, 1, 2, 3, 4, 5)
            .pipe(distinct())
            .subscribe(val => console.log("Distinct", val));// OUTPUT: 1,2,3,4,5
    }

}
