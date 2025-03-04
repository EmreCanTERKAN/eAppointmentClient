import { Component, ElementRef, ViewChild} from '@angular/core';
import { departments } from '../../app/constants';
import { DoctorModel } from '../../app/models/doctor.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular'; 
import { HttpService } from '../../app/services/http.service';
import { AppointmentModel } from '../../app/models/appointment.model';
import { CreateAppointmentModel } from '../../app/models/create-appointment.model';
import { FormValidateDirective } from 'form-validate-angular';
import { PatientModel } from '../../app/models/patient.model';
import { SwalService } from '../../app/services/swal.service';

declare const $:any;

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,DxSchedulerModule,FormValidateDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[DatePipe]
})
export class HomeComponent {
departmens = departments; 
doctors : DoctorModel[] = [];

@ViewChild("addModalCloseBtn") addModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;

selectedDepartmentValue: number = 0;
selectedDoctorId: string = "";

appointments: AppointmentModel[] = [];
createModel : CreateAppointmentModel = new CreateAppointmentModel();

constructor(
  private http: HttpService,
  private date: DatePipe,
  private swal: SwalService
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

onAppointmentFormOpening(event:any){
  event.cancel = true;

  this.createModel.startDate = this.date.transform(event.appointmentData.startDate,"dd.MM.yyy HH:mm") ?? "";
  this.createModel.endDate = this.date.transform(event.appointmentData.endDate,"dd.MM.yyy HH:mm") ?? "";
  this.createModel.doctorId = this.selectedDoctorId;
  $("#addModal").modal("show");
}

getPatient(){
  this.http.post<PatientModel>("Appointments/GetPatientByIdentityNumber",{identityNumber:this.createModel.identityNumber}, res=>{
    if(res.data === null){
      this.createModel.firstName = "";
      this.createModel.lastName = "";
      this.createModel.city = "";
      this.createModel.town = "";
      this.createModel.fullAddress = "";
      this.createModel.patientId = "";
      return;
    }

    this.createModel.patientId = res.data.id;
    this.createModel.firstName = res.data.firstName;
    this.createModel.lastName = res.data.lastName;
    this.createModel.city = res.data.city;
    this.createModel.town = res.data.town;
    this.createModel.fullAddress = res.data.fullAddress;
    
  })
}

create(form : NgForm){
  if(form.valid){
    this.http.post<string>("Appointments/Create", this.createModel, res => {
      this.swal.callToast(res.data);
      this.addModalCloseBtn?.nativeElement.click();
      this.createModel = new CreateAppointmentModel();
      this.getAllAppointments();

    })
  }
}

onAppointmentDeleted(event : any){
  event.cancel = true;
}

onAppointmentDeleting(event : any){
  event.cancel = true;

  console.log(event);
  
  this.swal.callSwal("Delete appointment?",`You want to delete ${event.appointmentData.patient.fullName}`,() =>
  {
    this.http.post("Appointments/DeleteById", {id: event.appointmentData.id}, res=> {
      this.swal.callToast(res.data,"info");
      this.getAllAppointments();
    })
  })
}

onAppointmentUpdating(event : any ){
  event.cancel = true;
  const data = {
    id : event.oldData.id,
    startDate: this.date.transform(event.newData.startDate,"dd.MM.yyy HH:mm"),
    endDate: this.date.transform(event.newData.endDate,"dd.MM.yyy HH:mm"),
  }
  console.log(data);
  this.http.post<string>("Appointments/Update", data, res => {
    this.swal.callToast(res.data);
    this.getAllAppointments();
  })
}
}
