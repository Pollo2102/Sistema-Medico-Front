import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  picker: string;
  minDate: Date;
  maxDate: Date;
  

  constructor() {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);

   }

  ngOnInit(): void {
  }

}
