import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements AfterViewInit {
  ngAfterViewInit() 
  {
    const cards = document.querySelectorAll('.product-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  
  }
}
