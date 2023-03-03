import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


export class PriceModel {
    usd?: number;
}

@Component({
    selector: 'app-usd-mmk',
    templateUrl: './usd-mmk.component.html',
    styleUrls: ['./usd-mmk.component.css']
})

export class UsdMmkComponent {
    price: PriceModel = new PriceModel();
    USDMMK: FormGroup;
    usd?: number = 1;
    mmk: number = 2000;

    constructor(private formBuilder: FormBuilder) {
        this.USDMMK = this.formBuilder.group({
            'usd': [this.price.usd, [
                Validators.required,
            ]]
        });
    }

    onChangeSubmit() {
        this.usd = this.price.usd
        this.USDMMK.reset()
    }
}
