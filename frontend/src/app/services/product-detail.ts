import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDetail {
  constructor(private http: HttpClient){}

  getMyProducts(f_id: any)
  {
    return this.http.get(`http://localhost:3000/api/productDetail/my-products/${f_id}`);
  }

  getAllProducts()
  {
    return this.http.get(`http://localhost:3000/api/productDetail/all-products`);
  }

  deleteProduct(product_id:any)
{
  return this.http.delete(
    `http://localhost:3000/api/productDetail/delete-products/${product_id}`
  );
}

updateProduct(productId:any, formData:any)
{
  return this.http.put(
    `http://localhost:3000/api/productDetail/update-product/${productId}`,
    formData
  );
}

}
