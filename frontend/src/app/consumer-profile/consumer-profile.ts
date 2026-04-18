import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
isPasswordModalOpen = false;
passwordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};
showCurrent = false;
showNew = false;
showConfirm = false;

constructor( private http: HttpClient, private router: Router, private crd: ChangeDetectorRef, private toastr: ToastrService){}

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

openPasswordModal() {
  this.isPasswordModalOpen = true;
  this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  this.showCurrent = false;
  this.showNew = false;
  this.showConfirm = false;
}

closePasswordModal() {
  this.isPasswordModalOpen = false;
  this.crd.detectChanges();
}

updatePassword() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const { currentPassword, newPassword, confirmPassword } = this.passwordData;

  if (!currentPassword) {
    this.toastr.error("Please enter your current password");
    return;
  }
  if (!passwordRegex.test(newPassword)) {
    this.toastr.error("Password must contain at least 6 characters, including numbers and alphabets");
    return;
  }
  if (newPassword !== confirmPassword) {
    this.toastr.error("New passwords do not match");
    return;
  }

  const payload = {
    id: localStorage.getItem("consumerId"),
    currentPassword,
    newPassword
  };

  this.http.put('http://localhost:3000/api/update-consumer-password', payload).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message || "Password updated successfully");
      this.closePasswordModal();
    },
    error: (err: any) => {
      this.toastr.error(err.error?.message || "Failed to update password");
      this.closePasswordModal();
    }
  });
}

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

}
