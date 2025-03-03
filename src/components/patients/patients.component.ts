import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '../../app/models/patient.model';
import { HttpService } from '../../app/services/http.service';
import { SwalService } from '../../app/services/swal.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidateDirective } from 'form-validate-angular';
import { PatientPipe } from '../../app/pipe/patient.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [CommonModule,FormsModule,FormValidateDirective,PatientPipe,RouterLink],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  patients : PatientModel[] = [];
  


  createModel : PatientModel = new PatientModel();
  updateModel : PatientModel = new PatientModel();

  @ViewChild("addModalCloseBtn") addModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  
  search:string = "";
  
constructor(
  private http: HttpService,
  private swal : SwalService
){}
ngOnInit(): void {
    this.getAll();
  }

getAll(){
  this.http.post<PatientModel[]>("Patients/GetAll",{},(res)=>{
    console.log(res);
    
    this.patients = res.data;
  })
}

add(form: NgForm){
  if(form.valid){
    this.http.post<string>("Patients/Create",this.createModel, (res) => {
      this.swal.callToast(res.data,"success");
      this.getAll();
      this.addModalCloseBtn?.nativeElement.click();
      this.createModel = new PatientModel();
    });
  }
}

delete(id:string, fullName:string)
{
  this.swal.callSwal("Delete patient?",`You want to delete ${fullName}`,()=>{
    this.http.post<string>("Patients/DeleteById",{id:id},(res)=>{
      this.swal.callToast(res.data,"info")
      this.getAll();
    })    
  })
}

get(data:PatientModel){
  console.log(data);
  
  this.updateModel = {...data};
}

update(form:NgForm){
  if(form.valid){
    this.http.post<string>("Patients/Update",this.updateModel, (res) => {
      this.swal.callToast(res.data,"success");
      this.getAll();
      this.updateModalCloseBtn?.nativeElement.click();
    });
  }
}
}

