import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FarmerLogin {
  constructor(private http: HttpClient){}
  
  farmerLogin(data: any)
  {
    return this.http.post('https://organic-root-api.onrender.com/api/farmer-login', data);
  }
}
