import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../app/services/http.service';
import { DoctorModel } from '../../app/models/doctor.model';
import { CommonModule } from '@angular/common';
import { departments } from '../../app/constants';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule,RouterLink,FormsModule,FormValidateDirective],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors : DoctorModel[] = [];
  departments = departments
  createModel : DoctorModel = new DoctorModel();

  @ViewChild("addModalCloseBtn") addModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  
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

add(form: NgForm){
  if(form.valid){
    this.http.post<string>("Doctors/Create",this.createModel, (res) => {
      console.log(res);
      this.getAll();
      this.addModalCloseBtn?.nativeElement.click();
      this.createModel = new DoctorModel();
    });
  }
}
}
