import { Component, Input, OnInit } from '@angular/core';

import { Patient } from '../models/patient'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userID: number;
  currentPatient: Patient;

  picker: string;
  minDate: Date;
  maxDate: Date;
  

  constructor() {

    this.userID = JSON.parse(localStorage.getItem('currentUser')).id;

    this.currentPatient = new Patient();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);

   }

  ngOnInit(): void {
  }

}
