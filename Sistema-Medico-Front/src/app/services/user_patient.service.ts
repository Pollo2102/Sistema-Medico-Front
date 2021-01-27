import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User_Patient } from '../models/user_patient';

@Injectable({ providedIn: 'root' })
export class UserPatientService {
    constructor(private http: HttpClient) { }

    registerUserPatient(user_patient: User_Patient) {
        return this.http.post<any>(`${environment.apiUrl}/user-patients/insert`, user_patient);
    }
}