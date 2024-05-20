import { BloodType, Gender, MaritalStatus, MilitaryStatus, Religion } from "./add-employee-personal";

export interface EditEmployeePersonal {
    id: number;
    attendanceCode: number;
    employeeName: string;
    employeePhoto: string;
    birthDate: Date;
    countryOfBirth: string;
    birthCity: number;
    nationality: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    religion: Religion;
    militaryStatus: MilitaryStatus;
    militaryNumber?: string;
    bloodType?: BloodType;
    withSpecialNeeds: boolean;
  }