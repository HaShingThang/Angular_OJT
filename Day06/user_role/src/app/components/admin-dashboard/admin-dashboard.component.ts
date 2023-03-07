import { Component, OnInit } from '@angular/core';
import { Fruits } from 'src/app/Interface/fruits.interface';
import { FruitsService } from 'src/app/services/fruits.service';

declare var window: any;
@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

    allFruits: Fruits[] = [];
    deleteModal: any;
    idTodelete: number = 0;

    constructor(private fruitService: FruitsService) { }

    ngOnInit(): void {
        this.get();
        this.deleteModal = new window.bootstrap.Modal(
            document.getElementById('deleteModal')
        );
    }

    get() {
        this.fruitService.get().subscribe((data) => {
            this.allFruits = data;
        });
    }

    openDeleteModal(id: number) {
        this.idTodelete = id;
        this.deleteModal.show();
    }

    delete() {
        this.fruitService.delete(this.idTodelete).subscribe({
            next: (data) => {
                this.allFruits = this.allFruits.filter(_ => _.id != this.idTodelete)
                this.deleteModal.hide();
            },
        });
    }
}