import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatSelectModule

  ],

   
   templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'

})
export class EmployeeListComponent implements OnInit {

  displayedColumns = ['employee_id', 'employee_name', 'email','salary','actions'];
  dataSource = new MatTableDataSource<any>();
  
    constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}



  
ngOnInit(): void {
    this.loadEmployees();
  }

  

  loadEmployees() {
    this.employeeService.getEmployees()
    .subscribe(res => this.dataSource.data = res);
  }
  
  
  goToAdd() {
    this.router.navigate(['/employee/add']);
  }

  goToEdit(row: any) {
    this.router.navigate(['/employee/add', row.employee_id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Delete Employee?')) {
      this.employeeService.deleteEmployee(id)
        .subscribe(() => this.loadEmployees());
    }
  }

  applyFilter(event: Event) {
    this.dataSource.filter =
      (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
