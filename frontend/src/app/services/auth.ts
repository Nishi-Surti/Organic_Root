import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class Auth {

 
  
  isLoggedIn = false;
  role: 'Admin' | 'Farmer' | 'Consumer' | null = null;

  loginAs(role: 'Admin' | 'Farmer' | 'Consumer') {
    this.isLoggedIn = true;
    this.role = role;

    localStorage.setItem('role', role);
  }
logout() {
  this.isLoggedIn = false;
  this.role = null;
  localStorage.removeItem('role'); 
}

    api = "http://localhost:3000/admin";

    constructor(private http: HttpClient, private router: Router)
    {
        const savedRole = localStorage.getItem('role');

        if(savedRole)
        {
          this.isLoggedIn = true;
          this.role = savedRole as any;
        }

    }

    loginAdmin(data: any)
    {
        return this.http.post("http://localhost:3000/admin/admin-login", data);
    }

    loginFarmer(data: any)
    {
      return this.http.post("http://localhost:3000/api/login-farmer",data);
    }
    
    registerFarmer(data: any) 
    {
      return this.http.post('http://localhost:3000/api/regis', data);
    }
}
