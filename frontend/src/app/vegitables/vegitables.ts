import { CommonModule } from '@angular/common';
import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { Product } from '../services/product';
import { CartPage } from '../services/cart-page';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vegitables',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './vegitables.html',
  styleUrl: './vegitables.css',
})
export class Vegitables implements OnInit {

constructor (private product: Product,
              private cdr: ChangeDetectorRef,
              private cart: CartPage,
              private router: Router,
              private toastr: ToastrService
){}

vegetables:any[]=[];


ngOnInit()
{

    this.loadProducts();

}
loadProducts()
{

    this.product.getProduct('Vegetables')
    .subscribe((data:any)=>{

      console.log("API DATA:",data);

      this.vegetables = data;

      this.cdr.detectChanges(); // 🔥 force UI update

    })

}
addToCart(product:any)
{

  this.cart.addToCart(product);

  this.toastr.success("Product Added to Cart 🛒", "Success");

  this.router.navigate(['/consumer/cart']);

}

buyNow(v:any)
{

  const product = {
    ...v,
    qty: 1   // default quantity
  };

  this.cart.setBuyProduct(product);   // product store karva mate
  this.router.navigate(['/consumer/checkout']);

}
}
