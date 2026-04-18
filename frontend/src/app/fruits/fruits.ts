import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { Router } from '@angular/router';
import { CartPage } from '../services/cart-page';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fruits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fruits.html',
  styleUrl: './fruits.css',
})
export class Fruits implements OnInit {

  constructor(private product: Product,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private cart: CartPage,
              private toastr: ToastrService
  ){}

  fruits: any[]=[];

  ngOnInit()
  {
    this.loadProducts();
  }
  
  loadProducts()
  {
    this.product.getProduct('fruits')
    .subscribe((data:any)=>{
      console.log("API DATA:",data);

      this.fruits = data;

      this.cdr.detectChanges(); // 🔥 force UI update

    })
  }

  addToCart(product:any)
  {

  this.cart.addToCart(product);

  this.toastr.success("Product Added to Cart 🛒", "Success");

  this.router.navigate(['/consumer/cart']);

}

 buyNow(f:any)
 {

  const product = {
    ...f,
    qty: 1   // default quantity
  };

  this.cart.setBuyProduct(product);   // product store karva mate
  this.router.navigate(['/consumer/checkout']);

}
}
