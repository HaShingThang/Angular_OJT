import { Component } from '@angular/core';
import { debounceTime, filter, map, Observable } from 'rxjs';

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
    setTimeout(() => { observer.next("4") }, 4000);
    setTimeout(() => { observer.next("5") }, 5000);
  }).pipe(
    filter((data: any) => data > 2),
    map((val) => { return val as number * 2 }),
    debounceTime(5000)
  )

  ngOnInit() {
    this.obs.subscribe(
      val => { console.log(val) },
      error => { console.log("error") },
      () => { console.log("Completed") }
    )
  }
}
