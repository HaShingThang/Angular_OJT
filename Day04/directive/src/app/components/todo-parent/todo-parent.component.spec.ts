import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoParentComponent } from './todo-parent.component';

describe('TodoParentComponent', () => {
    let component: TodoParentComponent;
    let fixture: ComponentFixture<TodoParentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TodoParentComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TodoParentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
