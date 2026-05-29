import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConsumerLogin {

  constructor(private http: HttpClient){}
  
  consumerLogin(data: any)
  {
    return this.http.post('https://organic-root-api.onrender.com/api/consumer-login',data)
  }
}
