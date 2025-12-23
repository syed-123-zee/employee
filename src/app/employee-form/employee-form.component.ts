import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-form',
  
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

  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  editPage:boolean = false;
  employeeId!:number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      
      employee_name: ['', Validators.required],
      email: ['', Validators.required],
      // salary: [''],
      salary: [],
      
    });

         this.employeeId = Number(this.route.snapshot.paramMap.get('employee_id'));

 if (this.employeeId) {
      this.editPage = true;
      this.loadEmployee();
    }
  }
  loadEmployee() {
    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe(res => this.employeeForm.patchValue(res));
  }

  saveEmployee() {
    if (this.employeeForm.invalid) return;

    if (this.editPage) {
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe(() => {
          alert('Updated successfully');
          // this.router.navigate(['/Employee/list']);
        });
    } else {
      this.employeeService
        .saveEmployee(this.employeeForm.value)
        .subscribe(() => {
          alert('Saved successfully');

        this.employeeForm.reset();
        });
    }
  }

  goToManage() {
    this.router.navigate(['/employee/list']);
  }
} 
