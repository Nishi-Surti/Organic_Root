import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-farmer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule,Footer],
  templateUrl: './farmer-layout.html',
  styleUrl: './farmer-layout.css',
})
export class FarmerLayout implements OnInit {
  constructor(
    private router: Router,
    private auth: Auth,
  ) {}

  role: string = '';
  farmerName : any;

  ngOnInit()
  {
    this.farmerName = localStorage.getItem('farmerName'); 
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('token'); // 🔥 IMPORTANT
    this.router.navigate(['/login']);
  }
  isSidebarOpen = false;

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMenuClick() {
    setTimeout(() => {
      this.isSidebarOpen = false;
    }, 100); // small delay for routing
  }

  handleNavigation() {
    this.isSidebarOpen = false;
  }
}
