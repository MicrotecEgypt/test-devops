import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { AgeService, RouterService } from 'shared-lib';
import { GetEmployeeById } from '../../models';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  providers: [RouterService],
})
export class ViewEmployeeComponent implements OnInit {
  employee?: GetEmployeeById;

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    const employeeId = this.routerService.currentId;
    this.employeeService.getEmployeeById(employeeId).subscribe((res) => {
      this.employee = res;
    });
  }

  constructor(
    private employeeService: EmployeeService,
    private routerService: RouterService,
    public ageService: AgeService
  ) {}
}
