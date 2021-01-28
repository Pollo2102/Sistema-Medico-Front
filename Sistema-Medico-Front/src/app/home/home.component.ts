import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Patient } from '../models/patient'
import { User_Patient } from '../models/user_patient'
import { User } from '../models/user';
import { PatientService } from '../services/patient.service'
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
  getPatientObj: Patient;

// ----------------------------
// Patient show information: 

  showSexo: string;
  showEstadoCivil: string;
  showReligion: string;
  showEscolaridad: string;
  showDate: string;

// ----------------------------

  getPatientID: number;
  http: HttpClient;

  picker: string;
  patientDate: string;
  minDate: Date;
  maxDate: Date;
  

  constructor(private patientService: PatientService, private userPatientService: UserPatientService) {

    this.userID = JSON.parse(localStorage.getItem('currentUser')).id;

    this.currentPatient = new Patient();
    this.getPatientObj = new Patient();
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
        this.patientService.registerPatient(this.currentPatient)
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

   getPatient = () => {
      if (!this.getPatientID) {
        console.log(`Patient id empty: ${this.getPatientID}`);
        return;
      }
      this.patientService.getPatient(this.getPatientID)
      .subscribe(data => {
        this.getPatientObj = data;
        this.updateGetFields();
      })
   }

   updateGetFields = () => {

      if (this.getPatientObj.sexo == 1)
        this.showSexo = "Masculino";
      else if (this.getPatientObj.sexo == 2)
        this.showSexo = "Femenino";

      if (this.getPatientObj.estado_civil == 0)
        this.showEstadoCivil = "Soltero"
      else if (this.getPatientObj.estado_civil == 1)
        this.showEstadoCivil = "Casado";

      if (this.getPatientObj.religion == 0)
        this.showReligion = 'Católico';
      else if (this.getPatientObj.religion == 1)
        this.showReligion = 'Ortodoxo';
      else if (this.getPatientObj.religion == 2)
        this.showReligion = 'Protestante';
      else if (this.getPatientObj.religion == 3)
        this.showReligion = 'Musulman';
      else if (this.getPatientObj.religion == 4)
        this.showReligion = 'Budista';
      else if (this.getPatientObj.religion == 5)
        this.showReligion = 'Judío';
      else if (this.getPatientObj.religion == 6)
        this.showReligion = 'Hindú';
      else if (this.getPatientObj.religion == 7)
        this.showReligion = 'Taoista';
      else if (this.getPatientObj.religion == 8)
        this.showReligion = 'Ateo';
      else if (this.getPatientObj.religion == 9)
        this.showReligion = 'Otro';

      if (this.getPatientObj.escolaridad == 0)
        this.showEscolaridad = 'Desconocido';
      if (this.getPatientObj.escolaridad == 1)
        this.showEscolaridad = 'Primaria';
      if (this.getPatientObj.escolaridad == 2)
        this.showEscolaridad = 'Secundaria';
      if (this.getPatientObj.escolaridad == 3)
        this.showEscolaridad = 'Universidad';

        let newDate = new Date(this.getPatientObj.fecha_nacimiento);

        let month = String(newDate.getMonth() + 1);
        let day = String(newDate.getDate());
        const year = String(newDate.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        this.showDate =  `${month}/${day}/${year}`;

   }

  ngOnInit(): void {
  }

}
