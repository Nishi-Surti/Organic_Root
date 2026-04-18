import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumer-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './consumer-navbar.html',
  styleUrl: './consumer-navbar.css',
})
export class ConsumerNavbar {
constructor(private router:Router, private auth: Auth){}

  logout() 
  {
    this.auth.logout();   // ✅ state reset

    this.router.navigate(['/login']);
  }
}
