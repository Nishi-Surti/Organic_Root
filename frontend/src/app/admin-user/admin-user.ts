import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminLogin } from '../services/admin-login';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-user.html',
  styleUrl: './admin-user.css',
})
export class AdminUser implements OnInit {

users: any[] = [];
userType: string = 'farmer';
totalUsers: number = 0;
// userType: string = 'farmer';

constructor(private route: ActivatedRoute, 
            private http: HttpClient, 
            private adminLogin: AdminLogin, 
            private cd:ChangeDetectorRef,
          private router: Router) {}

ngOnInit() 
{
  this.route.queryParams.subscribe(params => {
    this.userType = params['type'] || 'farmer';
    this.fetchUsers();
    this.getTotalUsers();
    // this.cd.detectChanges();
  });
  
}

onRoleChange() {
  // 🔥 1. direct API call karo
  this.fetchUsers();
  this.cd.detectChanges()

  // 🔥 2. pachhi URL update karo
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { type: this.userType }
  });
}

selectedRole: string = 'farmer';
fetchUsers() {
  console.log("Current Type:", this.userType); // 👀 check

  if (this.userType === 'farmer') {
    console.log("Calling Farmer API");
    this.http.get("http://localhost:3000/admin/farmers")
      .subscribe((res:any)=>{
        console.log("Farmer Data:", res);
        this.users = res;
        this.cd.detectChanges();
      });
  } else {
    console.log("Calling Consumer API");
    this.http.get("http://localhost:3000/admin/consumers")
      .subscribe((res:any)=>{
        console.log("Consumer Data:", res);
        this.users = res;
        this.cd.detectChanges();
      });
  }
}

getTotalUsers() {
  this.http.get("http://localhost:3000/admin/total-users")
    .subscribe((res:any)=>{
      this.totalUsers = res.totalUsers;
    });
}
}
