import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone : true,
  imports : [RouterModule,CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})


export class Home implements OnInit, AfterViewInit{
  currentSlide = 0;
totalSlides = 3;
slideInterval: any;

ngAfterViewInit() {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    const elements = document.querySelectorAll('.animate');
    elements.forEach(el => observer.observe(el));
  }


ngOnInit() {
  this.startAutoSlide();

  let index = 0;
  const reviews = document.querySelectorAll('.review-card');

  setInterval(() => {
    reviews[index].classList.remove('active');
    index = (index + 1) % reviews.length;
    reviews[index].classList.add('active');
  }, 3000);
}

startAutoSlide() {
  this.slideInterval = setInterval(() => {
    this.next();
  }, 4000);
}

next() {
  this.currentSlide =
    (this.currentSlide + 1) % this.totalSlides;
}

prev() {
  this.currentSlide =
    (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
}

goToSlide(index: number) {
  this.currentSlide = index;
}


}
