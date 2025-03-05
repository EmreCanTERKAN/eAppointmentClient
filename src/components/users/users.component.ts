import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { UserPipe } from '../../app/pipe/user.pipe';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../app/models/user.model';
import { HttpService } from '../../app/services/http.service';
import { SwalService } from '../../app/services/swal.service';
import { RoleModel } from '../../app/models/role.model';

@Component({
  selector: 'app-users',
  imports: [CommonModule,FormsModule,FormValidateDirective,UserPipe,RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users : UserModel[] = [];
  roles : RoleModel[] = [];  
  
  
    createModel : UserModel = new UserModel();
    updateModel : UserModel = new UserModel();
  
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
    this.http.post<UserModel[]>("Users/GetAll",{},(res)=>{
      console.log(res);
      
      this.users = res.data;
    })
  }
  
  add(form: NgForm){
    if(form.valid){
      this.http.post<string>("Users/Create",this.createModel, (res) => {
        this.swal.callToast(res.data,"success");
        this.getAll();
        this.addModalCloseBtn?.nativeElement.click();
        this.createModel = new UserModel();
      });
    }
  }
  
  delete(id:string, fullName:string)
  {
    this.swal.callSwal("Delete patient?",`You want to delete ${fullName}`,()=>{
      this.http.post<string>("Users/DeleteById",{id:id},(res)=>{
        this.swal.callToast(res.data,"info")
        this.getAll();
      })    
    })
  }
  
  get(data:UserModel){
    console.log(data);
    
    this.updateModel = {...data};
  }
  
  update(form:NgForm){
    if(form.valid){
      this.http.post<string>("Users/Update",this.updateModel, (res) => {
        this.swal.callToast(res.data,"success");
        this.getAll();
        this.updateModalCloseBtn?.nativeElement.click();
      });
    }
  }
  }
  


