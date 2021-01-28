import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Patient } from '../models/patient';

@Injectable({ providedIn: 'root' })
export class PatientService {
    constructor(private http: HttpClient) { }

    registerPatient = (patient: Patient) => {
        return this.http.post<any>(`${environment.apiUrl}/patients/insert`, patient);
    }

    getPatient = (patientID: number) => {
        return this.http.get<Patient>(`${environment.apiUrl}/patients/get/${patientID}`)
    }

}