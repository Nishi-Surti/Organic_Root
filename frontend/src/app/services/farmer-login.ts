import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FarmerLogin {
  constructor(private http: HttpClient){}
  
  farmerLogin(data: any)
  {
    return this.http.post('http://localhost:3000/api/farmer-login', data);
  }
}
