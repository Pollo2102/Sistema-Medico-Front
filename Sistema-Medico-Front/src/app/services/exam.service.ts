import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Physical_Exam_Adult } from '../models/physical_exam_adult';

@Injectable({ providedIn: 'root' })
export class ExamService {
    constructor(private http: HttpClient) { }

    registerExam = (exam: Physical_Exam_Adult) => {
        return this.http.post<any>(`${environment.apiUrl}/exam/insert`, exam);
    }

    getExam = (patientID: number, examDate: string) => {
        return this.http.get<Physical_Exam_Adult>(`${environment.apiUrl}/exam/get/${patientID}-${examDate}`);
    }

    getExams = (userID: number, patientID: number) => {
        return this.http.get<any[]>(`${environment.apiUrl}/exam/getAll/${userID}-${patientID}`);
    }

}