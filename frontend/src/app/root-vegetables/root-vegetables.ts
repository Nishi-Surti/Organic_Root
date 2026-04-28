import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../services/product';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartPage } from '../services/cart-page'; 
import { ToastrService } from 'ngx-toastr'; 
import { Auth } from '../services/auth';

@Component({
  selector: 'app-root-vegetables',
  imports: [CommonModule],
  templateUrl: './root-vegetables.html',
  styleUrl: './root-vegetables.css',
})
export class RootVegetables {

  
    constructor( private product: Product,
                  private cdr: ChangeDetectorRef,
                   private router: Router,
                private cart: CartPage,
                private toastr: ToastrService,
                private auth: Auth
    ){}
  
    rtveg: any[]=[];
  
    ngOnInit()
    {
      this.loadProducts();
    }
  
    loadProducts()
    {
      this.product.getProduct('Root Vegetables')
      .subscribe((data:any)=>{
        console.log("API DATA: ",data);
  
        this.rtveg = data;
  
        this.cdr.detectChanges();
      })
    }
  
    addToCart(product:any)
    {
      if (!this.auth.isLoggedIn || this.auth.role !== 'Consumer') {
        this.toastr.warning("Please login as a consumer to add to cart", "Warning");
        this.router.navigate(['/login']);
        return;
      }
  
    this.cart.addToCart(product);
  
    this.toastr.success("Product Added to Cart 🛒", "Success");
  
    this.router.navigate(['/consumer/cart']);
  
  }
  
   buyNow(rt:any)
   {
      if (!this.auth.isLoggedIn || this.auth.role !== 'Consumer') {
        this.toastr.warning("Please login as a consumer to buy products", "Warning");
        this.router.navigate(['/login']);
        return;
      }
  
    const product = {
      ...rt,
      qty: 1   // default quantity
    };
  
    this.cart.setBuyProduct(product);   // product store karva mate
    this.router.navigate(['/consumer/checkout']);
  
  }
}
