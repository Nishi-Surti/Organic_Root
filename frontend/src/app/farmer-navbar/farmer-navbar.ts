import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-farmer-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './farmer-navbar.html',
  styleUrl: './farmer-navbar.css',
})
export class FarmerNavbar {

  constructor(private router:Router, private auth: Auth){}

  logout() 
  {
    this.auth.logout();   // ✅ state reset

    this.router.navigate(['/login']);
  }
}
