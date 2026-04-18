import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViewOrder {
  
  constructor(private http:HttpClient){}

getConsumerOrders(c_id:any){
return this.http.get(`http://localhost:3000/api/consumer-orders/${c_id}`);
}

cancelOrder(orderId:number){
  return this.http.put(`http://localhost:3000/api/cancel-order/${orderId}`, {});
}

deleteOrder(orderId:number){
  return this.http.delete(`http://localhost:3000/api/delete-order/${orderId}`);
}

}
