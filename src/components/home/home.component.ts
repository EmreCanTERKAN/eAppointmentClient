import { Component } from '@angular/core';
import { departments } from '../../app/constants';
import { DoctorModel } from '../../app/models/doctor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular'; 
import { HttpService } from '../../app/services/http.service';
import { AppointmentModel } from '../../app/models/appointment.model';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,DxSchedulerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
departmens = departments; 
doctors : DoctorModel[] = [];

selectedDepartmentValue: number = 0;
selectedDoctorId: string = "";

appointments: AppointmentModel[] = [];

constructor(
  private http: HttpService
){}

getAllDoctor(){
  this.selectedDoctorId = "";
  if(this.selectedDepartmentValue > 0){
    this.http.post<DoctorModel[]>("Appointments/GetAllDoctorsByDepartment",{departmentValue: +this.selectedDepartmentValue},(res) =>{
      this.doctors = res.data;
    })
  }
}
getAllAppointments(){
  if(this.selectedDoctorId){
    this.http.post<AppointmentModel[]>("Appointments/GetAllByDoctorId",{doctorId: this.selectedDoctorId},(res) =>{
      this.appointments = res.data;
    })
  }
}
}
