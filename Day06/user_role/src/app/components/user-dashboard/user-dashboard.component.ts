import { Component, OnInit } from '@angular/core';
import { Fruits } from 'src/app/Interface/fruits.interface';
import { FruitsService } from 'src/app/services/fruits.service';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
    allFruits: Fruits[] = [];

    constructor(private fruitService: FruitsService) { }

    ngOnInit(): void {
        this.get();
    }

    get() {
        this.fruitService.get().subscribe((data) => {
            this.allFruits = data;
        });
    }
}