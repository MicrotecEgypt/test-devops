import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { AddEmployeePersonal } from '../../models';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  LookupEnum = LookupEnum;

  Age: string = '';
  EmployeeCode = '';

  lookups: { [key: string]: lookupDto[] };

  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
    this.onBirthDateChange();
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      //LookupEnum.Country,
      LookupEnum.Gender,
      LookupEnum.MaritalStatus,
      LookupEnum.Religion,
      LookupEnum.MilitaryStatus,
      LookupEnum.BloodType,
    ]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  onBirthDateChange() {
    const birthDateControl = this.addEmployeeForm.get('birthDate');
    birthDateControl?.valueChanges.subscribe((birthDate) => {
      if (birthDateControl.valid) {
        this.Age = this.calculateAge(birthDate);
      } else {
        this.Age = '';
      }
    });
  }


  private initializeForm() {
    this.addEmployeeForm = this.formBuilder.group({
      attendanceCode: new FormControl('', [customValidators.required]),
      employeeName: new FormControl('', [
        customValidators.required,
        customValidators.onlyLetter,
        customValidators.length(1, 75),
      ]),
      employeePhoto: new FormControl(null),
      birthDate: new FormControl(null ,[
        customValidators.required,
        customValidators.invalidBirthDate,
        customValidators.notUnderAge(18),
      ]),
      countryOfBirth: new FormControl('', [customValidators.required]),
      birthCity: new FormControl('', [customValidators.required]),
      nationality: new FormControl('', [customValidators.required]),
      gender: new FormControl('', [customValidators.required]),
      maritalStatus: new FormControl('', [customValidators.required]),
      religion: new FormControl('', [customValidators.required]),
      militaryStatus: new FormControl('', [customValidators.required]),
      militaryNumber: new FormControl(null, customValidators.length(0, 25)),
      bloodType: new FormControl(null),
      withSpecialNeeds: new FormControl(false),
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.addEmployeeForm, true)) return;
    const request: AddEmployeePersonal = this.addEmployeeForm.value;
    request.employeePhoto ="sfdsdf"
    this.employeeService.addEmployee(request);
  }

  calculateAge(birthDate: string): string {
    if (!birthDate) return '';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age.toString();
  }

  Discard() {
    this.addEmployeeForm.reset();
  }

  constructor(
    public lookupsService: LookupsService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private employeeService: EmployeeService,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}
