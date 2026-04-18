import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { Router } from '@angular/router';
import { CartPage } from '../services/cart-page';

@Component({
  selector: 'app-green-vegitables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './green-vegitables.html',
  styleUrl: './green-vegitables.css',
})
export class GreenVegitables implements OnInit {

  constructor( private product: Product,
                private cdr: ChangeDetectorRef,
                 private router: Router,
              private cart: CartPage,
  ){}

  gveg: any[]=[];

  ngOnInit()
  {
    this.loadProducts();
  }

  loadProducts()
  {
    this.product.getProduct('Green Vegetables')
    .subscribe((data:any)=>{
      console.log("API DATA: ",data);

      this.gveg = data;

      this.cdr.detectChanges();
    })
  }

  addToCart(product:any)
  {

  this.cart.addToCart(product);

  alert("Product Added to Cart 🛒");

  this.router.navigate(['/consumer/cart']);

}

 buyNow(g:any)
 {

  const product = {
    ...g,
    qty: 1   // default quantity
  };

  this.cart.setBuyProduct(product);   // product store karva mate
  this.router.navigate(['/consumer/checkout']);

}
}
