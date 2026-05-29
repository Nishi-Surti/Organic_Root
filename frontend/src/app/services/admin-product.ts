import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Adminproduct {
  private apiUrl = 'https://organic-root-api.onrender.com/api/adminProduct/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
