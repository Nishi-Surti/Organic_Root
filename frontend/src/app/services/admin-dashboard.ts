import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardServices {
  constructor(private http: HttpClient){}

  getDashboardData()
  {
    return this.http.get("http://localhost:3000/admin/dashboard");
  }
}
