import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
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
  // Direct order logic
  console.log("Buying:", product);

  // You can redirect to checkout page
  this.router.navigate(['/consumer/checkout'], { state: { product } });
}
}
