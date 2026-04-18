import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  constructor(private router: Router, private auth: Auth) {}
  
  role:string ='';

  logout() 
  {
      this.auth.logout();   // 🔥 IMPORTANT
      this.router.navigate(['/login']);
  }
  isSidebarOpen = false;

closeSidebar() 
{
  this.isSidebarOpen = false;
}

toggleSidebar() 
{
  this.isSidebarOpen = !this.isSidebarOpen;
}

onMenuClick() 
{
  setTimeout(() => {
    this.isSidebarOpen = false;
  }, 100); // small delay for routing
}

handleNavigation() 
{
  this.isSidebarOpen = false;
}

isUserDropdownOpen = false;

toggleUserDropdown() {
  this.isUserDropdownOpen = !this.isUserDropdownOpen;
}

}
