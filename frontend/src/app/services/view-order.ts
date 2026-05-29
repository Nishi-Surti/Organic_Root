import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViewOrder {
  
  constructor(private http:HttpClient){}

getConsumerOrders(c_id:any){
return this.http.get(`https://organic-root-api.onrender.com/api/consumer-orders/${c_id}`);
}

cancelOrder(orderId:number){
  return this.http.put(`https://organic-root-api.onrender.com/api/cancel-order/${orderId}`, {});
}

deleteOrder(orderId:number){
  return this.http.delete(`https://organic-root-api.onrender.com/api/delete-order/${orderId}`);
}

}
