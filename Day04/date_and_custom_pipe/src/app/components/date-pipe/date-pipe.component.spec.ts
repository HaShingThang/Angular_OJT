import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipeComponent } from './date-pipe.component';

describe('DatePipeComponent', () => {
    let component: DatePipeComponent;
    let fixture: ComponentFixture<DatePipeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatePipeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DatePipeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
