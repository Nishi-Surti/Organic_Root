import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  ngAfterViewInit() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
}
}
