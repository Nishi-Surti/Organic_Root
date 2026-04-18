import { Component } from '@angular/core';
import { CartPage } from '../services/cart-page';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  cartItems:any[] = [];

  constructor(private cart: CartPage,private router: Router){}

  ngOnInit(){

    this.cartItems = this.cart.getCart();

  }

  remove(id:any){

    this.cart.removeItem(id);

    this.cartItems = this.cart.getCart();

  }

  /* increase qty */ 
  increase(item:any) { 
    if (item.qty < item.quantity) {
      item.qty += 1; 
      item.showLimitedStockError = false;
    } else {
      item.showLimitedStockError = true;
    }
  }

  /* decrease qty */
  decrease(item:any) { 
    if(item.qty > 1) { 
      item.qty -= 1; 
      item.showLimitedStockError = false;
    } 
  }

  buyNow(item:any){

  this.cart.setBuyProduct(item);   // product store karva mate
  this.router.navigate(['/checkout']);

}

getTotal(){
  return this.cartItems.reduce((total, item) => {
    return total + (item.price * item.qty);
  }, 0);
}

buyAll(){
  this.cart.setBuyProduct(this.cartItems); // full cart pass karo
  this.router.navigate(['/consumer/checkout']);
}
}
