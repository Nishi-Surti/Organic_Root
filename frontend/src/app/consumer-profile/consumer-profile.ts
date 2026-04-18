import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-consumer-profile',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './consumer-profile.html',
  styleUrl: './consumer-profile.css',
})
export class ConsumerProfile {

  consumer:any = {};
isEdit = false;
totalOrders = 0;

constructor( private http: HttpClient, private router: Router, private crd: ChangeDetectorRef){}

ngOnInit(){
  const c_id = localStorage.getItem("consumerId");

  this.http.get(`http://localhost:3000/api/consumer/${c_id}`)
  .subscribe((res:any)=>{
    this.consumer = res;
    this.crd.detectChanges();
  });

  // orders count
  this.http.get(`http://localhost:3000/api/consumer-orders/${c_id}`)
  .subscribe((res:any)=>{
    this.totalOrders = res.length;
    this.crd.detectChanges();
  });
}

getInitials(name: string): string {
  if (!name) return '';

  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (
    parts[0][0] + parts[parts.length - 1][0]
  ).toUpperCase();
}

toggleEdit(){
  this.isEdit = !this.isEdit;

  if(!this.isEdit){
    // save API
    this.http.put(`http://localhost:3000/api/update-consumer`, this.consumer)
    .subscribe(()=>{
      alert("Profile updated");
    });
  }
}

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

}
