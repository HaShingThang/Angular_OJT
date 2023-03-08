import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fruits } from '../Interface/fruits.interface';
import { environment } from '../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class FruitsService {
    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<Fruits[]>(`${environment.apiEndpoint}/fruits`);
    }

    create(payload: Fruits) {
        return this.http.post<Fruits>(`${environment.apiEndpoint}/fruits`, payload);
    }

    getById(id: number) {
        return this.http.get<Fruits>(`${environment}/fruits/${id}`);
    }

    update(payload: Fruits) {
        return this.http.put(`${environment.apiEndpoint}/fruits/${payload.id}`, payload);
    }

    delete(id: number) {
        return this.http.delete<Fruits>(`${environment.apiEndpoint}/fruits/${id}`);
    }
}
