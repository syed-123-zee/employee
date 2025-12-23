import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    private apiUrl = 'http://localhost:3000/api/employee';

 constructor(private http: HttpClient) {}

 
 // Employee
 
 saveEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, data);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/put/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }


}
