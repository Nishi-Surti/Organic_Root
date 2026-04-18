import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConsumerLogin {

  constructor(private http: HttpClient){}
  
  consumerLogin(data: any)
  {
    return this.http.post('http://localhost:3000/api/consumer-login',data)
  }
}
