import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent {
    isRun: boolean = false;

    runSubcription(val: boolean) {
        this.isRun = !val;
        if (this.isRun) {
            const observable1 = interval(400);
            const observable2 = interval(300);

            const subscription = observable1.subscribe((x) =>
                console.log('first: ' + x)
            );
            const childSubscription = observable2.subscribe((x) =>
                console.log('second: ' + x)
            );

            subscription.add(childSubscription);

            setTimeout(() => {
                // Unsubscribes BOTH subscription and childSubscription
                subscription.unsubscribe();
            }, 1000);
        } else {
            window.location.reload();
        }
    }
}
