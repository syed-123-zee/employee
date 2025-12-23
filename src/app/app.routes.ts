import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


export const routes: Routes = [

    
{path:'employee/add',component:EmployeeFormComponent },
{path:'employee/add/:employee_id',component:EmployeeFormComponent },
{path:'employee/list',component:EmployeeListComponent},


];
