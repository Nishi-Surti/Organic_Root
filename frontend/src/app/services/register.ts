import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Register {
  constructor( private http: HttpClient){}
  
  registerFarmer(data: any){
    return this.http.post('http://localhost:3000/api/register-farmer', data);
  }

  registerConsumer(data: any){
    return this.http.post('http://localhost:3000/api/register-consumer', data);
  }

  getFarmers()
  {
    return this.http.get("http://localhost:3000/api/farmers");
  }
}
