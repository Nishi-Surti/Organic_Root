import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminLogin {
  
  constructor( private http: HttpClient){}

  adminLogin(data : any)
  {
      return this.http.post('http://localhost:3000/admin-login',data);
  }

  getTotalFarmers()
  {
    return this.http.get<any>("http://localhost:3000/admin/totalFarmers");
  }

  getTotalProducts()
  {
    return this.http.get<any>("http://localhost:3000/admin/totalProducts");
  }

  getTotalOrders()
  {
    return this.http.get<any>("http://localhost:3000/admin/totalOrders");
  }

  getTotalEarnings()
  {
    return this.http.get<any>("http://localhost:3000/admin/adminOrders");
  }

  getTotalUser()
  {
    return this.http.get<any>("http://localhost:3000/admin/total-users");
  }

}
