import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruits } from 'src/app/Interface/fruits.interface';
import { FruitsService } from 'src/app/services/fruits.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
})

export class EditComponent implements OnInit {
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
        private route: ActivatedRoute,
        private router: Router,
        private fruitService: FruitsService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((param) => {
            var id = Number(param.get('id'));
            this.getById(id);
        });
    }

    getById(id: number) {
        this.fruitService.getById(id).subscribe((data) => {
            this.fruitForm = data;
        });
    }

    goBackToPrevPage(): void {
        this.location.back();
    }

    update() {
        const isName = this.fruitForm.name === '';
        const isPrice = this.fruitForm.price <= 0;
        const isQty = this.fruitForm.quantity <= 0;

        if (isName || isPrice || isQty) {
            if (isName) this.invalidName = 'Rquired item name.';
            if (isPrice) this.invalidPrice = 'Item price should be grather than 0.';
            if (isQty) this.invalidQty = 'Item quentity should be grather than 0.';
        } else {
            this.fruitService.update(this.fruitForm).subscribe({
                next: (data) => {
                    this.router.navigate(['admin']);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }
}
