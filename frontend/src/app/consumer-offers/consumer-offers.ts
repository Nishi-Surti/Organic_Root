import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-consumer-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumer-offers.html',
  styleUrl: './consumer-offers.css',
})
export class ConsumerOffers{
  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  offers = [
  {
    name: "Organic Tomato",
    originalPrice: 60,
    offerPrice: 40,
    discount: 33,
    image: "assets/tomato.jpg"
  },
  {
    name: "Fresh Potato",
    originalPrice: 50,
    offerPrice: 35,
    discount: 30,
    image: "assets/potato.jpg"
  }
];

buyNow(product: any) {
    if (!this.auth.isLoggedIn || this.auth.role !== 'Consumer') {
      this.toastr.warning("Please login as a consumer to buy products", "Warning");
      this.router.navigate(['/login']);
      return;
    }

  // Direct order logic
  console.log("Buying:", product);

  // You can redirect to checkout page
  this.router.navigate(['/consumer/checkout'], { state: { product } });
}
}
