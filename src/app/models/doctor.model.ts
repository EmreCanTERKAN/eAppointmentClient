export class DoctorModel{
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    departmentEnum: DepartmentModel = new DepartmentModel();
}

export class DepartmentModel{
    name: string = "";
    value: number = 0;
}