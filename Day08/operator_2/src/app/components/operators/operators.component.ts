import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import {
  first,
  of,
  map,
  from,
  interval,
  forkJoin,
  timer,
  combineLatest,
} from 'rxjs';
import {
  distinctUntilChanged,
  throttleTime,
  pluck,
  catchError,
  mergeMap,
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css'],
})
export class OperatorsComponent {
  isRun: boolean = false

  runOperator(val: boolean) {
    this.isRun = !val
    if (this.isRun) {
      of(1, 2, 3)
        .pipe(map((x) => x * x))
        .subscribe((v) => console.log(`LineOne value: ${v}`));

      of(1, 2, 3)
        .pipe(first())
        .subscribe((v) => console.log(`LineTwo value: ${v}`)); //Output: 1

      //distinctUnitChanged Operator
      const source$ = from([1, 1, 2, 2, 3, 3]);

      source$
        .pipe(distinctUntilChanged())
        // output: 1,2,3
        .subscribe((v) => console.log('LineThree:', v));

      //throttleTime operator r
      const source = interval(1000);
      /*
        emit the first value, then ignore for 5 seconds. repeat...
      */
      const example = source.pipe(throttleTime(5000));
      // output: 0...6...12
      const subscribe = example.subscribe((val) => console.log('LineFour', val));

      //forkJoin Operator
      forkJoin(
        // as of RxJS 6.5+ we can use a dictionary of sources
        {
          google: ajax.getJSON('https://api.github.com/users/google'),
          microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
          users: ajax.getJSON('https://api.github.com/users'),
        }
      )
        // { google: object, microsoft: object, users: array }
        .subscribe((v) => console.log('LineFive:', v));

      //pluck operator
      const sourceTwo = from([
        {
          name: 'Joe',
          age: 30,
          job: { title: 'Developer', language: 'JavaScript' },
        },
        //will return undefined when no job is found
        { name: 'Sarah', age: 35 },
      ]);
      //grab title property under job
      const exampleOne = sourceTwo.pipe(pluck('job', 'title'));
      //output: "Developer" , undefined
      const subscribeOne = exampleOne.subscribe((val) =>
        console.log('LineSix:', val)
      );

      //catchError() operator
      of(1, 2, 3, 4, 5)
        .pipe(
          map((n) => {
            if (n === 4) {
              throw 'four!';
            }
            return n;
          }),
          catchError((err) => of('I', 'II', 'III', 'IV', 'V'))
        )
        .subscribe((x) => console.log('LineSeven:', x));
      // 1, 2, 3, I, II, III, IV, V

      //mergeMap() operator
      const letters = of('a', 'b', 'c');
      const result = letters.pipe(
        mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
      );
      result.subscribe((x) => console.log('LineEight:', x));
      // Results in the following:
      // a0
      // b0
      // c0
      // a1
      // b1
      // c1
      // continues to list a,b,c with respective ascending integers

      //combine latest operator
      // timerOne emits first value at 1s, then once every 4s
      const timerOne$ = timer(1000, 4000);
      // timerTwo emits first value at 2s, then once every 4s
      const timerTwo$ = timer(2000, 4000);
      // timerThree emits first value at 3s, then once every 4s
      const timerThree$ = timer(3000, 4000);

      // when one timer emits, emit the latest values from each timer as an array
      combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
        ([timerValOne, timerValTwo, timerValThree]) => {
          /*
            Example:
          timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
          timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
          timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
        */
          console.log(
            `LineNine=> Timer One Latest: ${timerValOne},
           Timer Two Latest: ${timerValTwo},
           Timer Three Latest: ${timerValThree}`
          );
        }
      );
    } else {
      window.location.reload();
    }
  }
}
