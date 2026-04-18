import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Product {
    constructor( private http: HttpClient){}
    
   getProduct(category:string)
   {
      return this.http
      .get<any[]>(`http://localhost:3000/api/product/category/${category}`)
      .pipe(shareReplay(1));   // ⚡ cache data
    }


}
