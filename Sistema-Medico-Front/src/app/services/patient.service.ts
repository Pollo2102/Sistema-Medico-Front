import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Patient } from '../models/patient';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    registerUser(patient: Patient) {
        return this.http.post<any>(`${environment.apiUrl}/patients/insert`, patient);
    }
}