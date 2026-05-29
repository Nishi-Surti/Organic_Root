import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Register {
  constructor( private http: HttpClient){}
  
  registerFarmer(data: any){
    return this.http.post('https://organic-root-api.onrender.com/api/register-farmer', data);
  }

  registerConsumer(data: any){
    return this.http.post('https://organic-root-api.onrender.com/api/register-consumer', data);
  }

  getFarmers()
  {
    return this.http.get("https://organic-root-api.onrender.com/api/farmers");
  }
}
