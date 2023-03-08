import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fruits } from 'src/app/Interface/fruits.interface';
import { FruitsService } from 'src/app/services/fruits.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
})

export class CreateComponent implements OnInit {
    fruitForm: Fruits = {
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
    };

    invalidName!: string;
    invalidPrice!: string;
    invalidQty!: string;

    constructor(
        private fruitService: FruitsService,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit(): void { }

    goBackToPrevPage(): void {
        this.location.back();
    }

    create() {
        const isName = this.fruitForm.name === '';
        const isPrice = this.fruitForm.price <= 0;
        const isQty = this.fruitForm.quantity <= 0;

        if (isName || isPrice || isQty) {
            if (isName) this.invalidName = 'Rquired item name.';
            if (isPrice) this.invalidPrice = 'Item price should be grather than 0.';
            if (isQty) this.invalidQty = 'Item quentity should be grather than 0.';
        } else {
            this.fruitService.create(this.fruitForm).subscribe({
                next: (data) => {
                    this.router.navigate(['/admin']);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }
}
