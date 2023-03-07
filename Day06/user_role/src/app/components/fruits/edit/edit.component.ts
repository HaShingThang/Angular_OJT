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

    validation!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fruitService: FruitsService
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

    update() {
        if (this.fruitForm.name === '') {
            this.validation = 'Required Item Name';
        } else if (this.fruitForm.price <= 0) {
            this.validation = 'Required Item price';
        } else if (this.fruitForm.quantity <= 0) {
            this.validation = 'Required Item Quentity';
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
