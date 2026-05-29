import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDetail {
  constructor(private http: HttpClient){}

  getMyProducts(f_id: any)
  {
    return this.http.get(`https://organic-root-api.onrender.com/api/productDetail/my-products/${f_id}`);
  }

  getAllProducts()
  {
    return this.http.get(`https://organic-root-api.onrender.com/api/productDetail/all-products`);
  }

  deleteProduct(product_id:any)
{
  return this.http.delete(
    `https://organic-root-api.onrender.com/api/productDetail/delete-products/${product_id}`
  );
}

updateProduct(productId:any, formData:any)
{
  return this.http.put(
    `https://organic-root-api.onrender.com/api/productDetail/update-product/${productId}`,
    formData
  );
}

}
