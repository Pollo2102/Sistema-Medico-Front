import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Patient } from '../models/patient'
import { Physical_Exam_Adult } from '../models/physical_exam_adult'
import { ExamService } from '../services/exam.service'

@Component({
  selector: 'app-examen-fisico',
  templateUrl: './examen-fisico.component.html',
  styleUrls: ['./examen-fisico.component.css']
})
export class ExamenFisicoComponent implements OnInit {

  userID: number;
  currentExamen: Physical_Exam_Adult;

  getPatientID: number;
  getExamDate: string;
  getExamObj: Physical_Exam_Adult;

  picker: string;
  examDate: string;
  minDate: Date;
  maxDate: Date;

  showDate: string;

  examDates = [];
  showExamDates = [];

  constructor(private examService: ExamService) {
    this.userID = JSON.parse(localStorage.getItem('currentUser')).id;

    this.currentExamen = new Physical_Exam_Adult();
    this.getExamObj = new Physical_Exam_Adult();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);

  }

  registerExam = () => {
    this.currentExamen.fecha_examen = new Date(this.examDate);
      console.log(JSON.stringify(this.currentExamen));
      if (this.verifyFields()) {
        console.log("Registering Exam...");
        this.examService.registerExam(this.currentExamen)
        .subscribe(data => {
          console.log(data);
          console.log("Exam Registered...");
        });
      }
  }

  getExam = () => {
    if (!this.getExamDate) {
      console.log(`Patient id empty: ${this.getExamDate}`);
      return;
    }
    console.log(this.getExamDate);
    let newDate = new Date(this.getExamDate);
    this.examService.getExam(this.getPatientID, `${newDate.getUTCFullYear()}-${newDate.getUTCMonth()+1}-${newDate.getUTCDate()}`)
    .subscribe(data => {
      if (data == null) {
        console.log("The exam doesn't exist.");
        return;
      }
      this.getExamObj = data;
      this.showDate = this.reformat_date(this.getExamObj.fecha_examen);
    });
  }

  getExamDates = () => {
    if (!this.getPatientID)
    {
      console.error("No patient ID has been entered.");
      return;
    }``
    this.showExamDates = [];
    this.examService.getExams(this.userID, this.getPatientID)
    .subscribe(data => {
      console.log(`Getting Dates...`);
      data.forEach(element => {
        console.log(element.fecha_examen);
        this.showExamDates.push(this.reformat_date(element.fecha_examen));
      });
    });
    console.log(this.showExamDates);
  }

  verifyFields = () => {
    if (!this.currentExamen.paciente_id && !this.currentExamen.fecha_examen)
      return false;
    return true;
  }

  reformat_date = (ref_date) => {
    console.log(`Reformat Date prev: ${ref_date}`);
    let newDate;
    if (!environment.production)
      newDate = new Date(ref_date /* this.currentExamen.fecha_examen */);
    else
      newDate = new Date(ref_date + 86400000);

    let month = String(newDate.getMonth() + 1);
    let day = String(newDate.getDate());
    const year = String(newDate.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

  
    return `${month}/${day}/${year}`;
  }

  get_all_dates = () => {
    this.examDates.forEach(element => {
      this.showExamDates.push(this.reformat_date(element));
    });
  }

  ngOnInit(): void {
  }

}
