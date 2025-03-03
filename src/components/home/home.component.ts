import { Component } from '@angular/core';
import { departments } from '../../app/constants';
import { DoctorModel } from '../../app/models/doctor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular'; 

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

appointments: any = [
  {
    startDate: new Date("2025-03-03 09:00"),
    endDate: new Date("2025-03-03 09:30"),
    text: "Emre Can TERKAN" // 'title' yerine 'text' kullanıldı
  },
  {
    startDate: new Date("2025-03-03 09:30"),
    endDate: new Date("2025-03-03 10:00"),
    text: "Emre Can TERKAN" // 'title' yerine 'text' kullanıldı
  },
  {
    startDate: new Date("2025-03-03 13:00"),
    endDate: new Date("2025-03-03 13:30"),
    text: "Emre Can TERKAN" // 'title' yerine 'text' kullanıldı
  }
];
}
