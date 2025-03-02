import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../app/services/http.service';
import { DoctorModel } from '../../app/models/doctor.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule,RouterLink],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors : DoctorModel[] = [];
constructor(
  private http: HttpService
){}
  ngOnInit(): void {
    this.getAll();
  }

getAll(){
  this.http.post("Doctors/GetAll",{},(res)=>{
    this.doctors = res.data;
  })
}
}
