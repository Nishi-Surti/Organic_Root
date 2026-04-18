import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar {

  constructor(private router:Router, private auth: Auth){}

  logout() 
  {
    this.auth.logout();   // ✅ state reset

    this.router.navigate(['/login']);
  }

  isMenuOpen = false;

  toggleMenu() 
  {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() 
  {
    this.isMenuOpen = false;
  }

  goToUser(type: string) 
  {
    this.router.navigate(['/admin-user'], {
      queryParams: { type: type }
    });
  }
  
}
