import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminLogin {
  
  constructor( private http: HttpClient){}

  adminLogin(data : any)
  {
      return this.http.post('https://organic-root-api.onrender.com/admin-login',data);
  }

  getTotalFarmers()
  {
    return this.http.get<any>("https://organic-root-api.onrender.com/admin/totalFarmers");
  }

  getTotalProducts()
  {
    return this.http.get<any>("https://organic-root-api.onrender.com/admin/totalProducts");
  }

  getTotalOrders()
  {
    return this.http.get<any>("https://organic-root-api.onrender.com/admin/totalOrders");
  }

  getTotalEarnings()
  {
    return this.http.get<any>("https://organic-root-api.onrender.com/admin/adminOrders");
  }

  getTotalUser()
  {
    return this.http.get<any>("https://organic-root-api.onrender.com/admin/total-users");
  }

}
