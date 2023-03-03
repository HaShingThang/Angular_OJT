import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdMmkComponent } from './usd-mmk.component';

describe('UsdMmkComponent', () => {
    let component: UsdMmkComponent;
    let fixture: ComponentFixture<UsdMmkComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsdMmkComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UsdMmkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
