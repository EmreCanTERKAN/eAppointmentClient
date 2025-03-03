import { Pipe, PipeTransform } from '@angular/core';
import { DoctorModel } from '../models/doctor.model';

@Pipe({
  name: 'doctor'
})
export class DoctorPipe implements PipeTransform {

  transform(value: DoctorModel[], search:string): DoctorModel[] {
    if(!search)
      return value;
    return value.filter(p=> 
      p.fullName.toLowerCase().includes(search.toLocaleLowerCase()) || p.departmentEnum.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }

}
