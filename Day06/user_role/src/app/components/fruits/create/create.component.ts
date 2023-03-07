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

    validation!: string;

    constructor(private fruitService: FruitsService, private router: Router) { }

    ngOnInit(): void { }

    create() {
        if (this.fruitForm.name === '') {
            this.validation = 'Required Item Name';
        } else if (this.fruitForm.price <= 0) {
            this.validation = 'Required Item price';
        } else if (this.fruitForm.quantity <= 0) {
            this.validation = 'Required Item Quentity';
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
