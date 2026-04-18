import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartPage {
  
  cartItems:any[] = [];

  constructor() {}

  addToCart(product:any){

    const exist = this.cartItems.find(p => p.product_id === product.product_id);

    if(exist){
      exist.qty += 1;
    }else{
      this.cartItems.push({...product, qty:1});
    }

  }

  getCart(){
    return this.cartItems;
  }

  removeItem(id:any){
    this.cartItems = this.cartItems.filter(p => p.product_id !== id);
  }

  buyProduct:any;

setBuyProduct(product:any){
  this.buyProduct = product;
}

getBuyProduct(){
  return this.buyProduct;
}
}
