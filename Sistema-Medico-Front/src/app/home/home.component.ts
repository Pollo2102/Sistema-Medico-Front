import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Patient } from '../models/patient'
import { User_Patient } from '../models/user_patient'
import { User } from '../models/user';
import { UserService } from '../services/patient.service'
import { UserPatientService } from '../services/user_patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userID: number;
  currentPatient: Patient;
  currUserPatient: User_Patient;
  http: HttpClient;

  picker: string;
  patientDate: string;
  minDate: Date;
  maxDate: Date;
  

  constructor(private userService: UserService, private userPatientService: UserPatientService) {

    this.userID = JSON.parse(localStorage.getItem('currentUser')).id;

    this.currentPatient = new Patient();
    this.currUserPatient = new User_Patient();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);

   }

   verifyFields = () => {
     if (!this.currentPatient.id || 
         !this.currentPatient.nombre_completo ||
         !this.currentPatient.fecha_nacimiento ||
         !this.currentPatient.sexo) {
          return false;
      }
      return true;
   }

   registerPatient = () => {
      this.currentPatient.fecha_nacimiento = new Date(this.patientDate);
      console.log(JSON.stringify(this.currentPatient));
      if (this.verifyFields()) {
        console.log("Registering User...");
        this.userService.registerUser(this.currentPatient)
        .subscribe(data => {
          console.log(data);
          console.log("User Registered...");
        });
        
        // Registering User-Patient
        this.currUserPatient.paciente_id = this.currentPatient.id;
        this.currUserPatient.usuario_id = this.userID;
        this.userPatientService.registerUserPatient(this.currUserPatient)
        .subscribe(data => {
          console.log(data);
          console.log("User-Patient registered...");
        });
      }
      else
        console.log("Failed");
   }

  ngOnInit(): void {
  }

}
