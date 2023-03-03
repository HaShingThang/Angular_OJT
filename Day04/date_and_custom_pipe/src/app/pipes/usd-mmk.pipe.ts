import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usdMmk'
})

export class UsdMmkPipe implements PipeTransform {
    transform(value: number, ...args: number[]) {
        let [price] = args

        return value * price;
    }
}
