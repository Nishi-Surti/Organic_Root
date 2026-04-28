import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FarmerLogin } from '../services/farmer-login';
import { ConsumerLogin } from '../services/consumer-login';
import { AdminLogin } from '../services/admin-login';
import { email } from '@angular/forms/signals';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
// import { AddProduct } from '../add-product/add-product';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  
selectedRole: string = ''; // default role
  loginForm!: FormGroup;
  isForgotPasswordModalOpen = false;
  forgotPasswordData = { identifier: '', newPassword: '', confirmPassword: '' };
  showNew = false;
  showConfirm = false;
 

  constructor(private fb: FormBuilder,
    private router: Router,
    private farmerLogin: FarmerLogin,
    private consumerLogin: ConsumerLogin,
    private auth: Auth,
    private toastr: ToastrService,
    private http: HttpClient,
    private crd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
       mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      email: ['',Validators.required],
       password: [
        '',
        [
          Validators.required,
          // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@#$%^&*]{6,}$'),
        ],
       ]
    });
  }

  selectRole(role: string) {
    this.selectedRole = role;

    if (role === 'admin') {
      this.loginForm.get('mobile')?.clearValidators();
      this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
    } else {
      this.loginForm.get('email')?.clearValidators();
      this.loginForm.get('mobile')?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]);
    }

    this.loginForm.get('mobile')?.updateValueAndValidity();
    this.loginForm.get('email')?.updateValueAndValidity();
  }

  showPassword = false;

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  onSubmit(){

    const adminData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };

  this.auth.loginAdmin(adminData);

  if(!this.loginForm.valid){
    this.toastr.warning("Please fill valid details", "Warning");
    return;
  }

  if(this.selectedRole === 'farmer'){

    this.farmerLogin.farmerLogin(this.loginForm.value)
      .subscribe({
        next:(res:any)=>{
          this.auth.loginAs('Farmer');
          this.toastr.success("Farmer Login Successfully ✅", "Success");

          localStorage.setItem('token', 'userLoggedIn');
          localStorage.setItem("farmerId", res.farmer_login.f_id);
          localStorage.setItem("farmerName", res.farmer_login.name);
          localStorage.setItem("farmerVillage", res.farmer_login.village);

          this.router.navigate(['/farmers']);
        },
        error:(err)=>{
          this.toastr.error("Invalid Farmer Credentials ❌", "Error");
        }
      });
  }

  else if(this.selectedRole === 'consumer'){

    this.consumerLogin.consumerLogin(this.loginForm.value)
      .subscribe({
        next:(res:any)=>{
          this.auth.loginAs('Consumer');
          this.toastr.success("Consumer Login Successfully ✅", "Success");


          localStorage.setItem('token', 'userLoggedIn');
          localStorage.setItem("consumerId", res.consumer_login.c_id);
          localStorage.setItem("consumerName", res.consumer_login.name);
          
          this.router.navigate(['/consumer']);
        },
        error:(err)=>{
          this.toastr.error("Invalid Consumer Credentials ❌", "Error");
        }
      });
  }

  else if(this.selectedRole === 'admin'){

    this.auth.loginAdmin(adminData)
      .subscribe({
        next:(res:any)=>{
          this.auth.loginAs('Admin');
          this.toastr.success("Admin Login Successfully ✅", "Success");
          localStorage.setItem('token', 'userLoggedIn');
          this.router.navigate(['/admin']);
        },
        error:(err)=>{
          this.toastr.error("Invalid Admin Credentials ❌", "Error");
        }
      });
  }

}

openForgotPasswordModal() {
  if (!this.selectedRole) {
    this.toastr.warning("Please select a role first (Farmer/Consumer/Admin)", "Warning");
    return;
  }
  this.isForgotPasswordModalOpen = true;
  this.forgotPasswordData = { identifier: '', newPassword: '', confirmPassword: '' };
  this.showNew = false;
  this.showConfirm = false;
  this.crd.detectChanges();
}

closeForgotPasswordModal() {
  this.isForgotPasswordModalOpen = false;
  this.crd.detectChanges();
}

updateForgotPassword() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const { identifier, newPassword, confirmPassword } = this.forgotPasswordData;

  if (!identifier) {
    this.toastr.error(`Please enter your ${this.selectedRole === 'admin' ? 'email' : 'mobile number'}`);
    return;
  }
  if (!passwordRegex.test(newPassword)) {
    this.toastr.error("Password must contain at least 6 characters, including numbers and alphabets");
    return;
  }
  if (newPassword !== confirmPassword) {
    this.toastr.error("Passwords do not match");
    return;
  }

  const payload = {
    role: this.selectedRole,
    identifier,
    newPassword
  };

  this.http.post('http://localhost:3000/api/forgot-password', payload).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message || "Password updated successfully");
      this.closeForgotPasswordModal();
    },
    error: (err: any) => {
      this.toastr.error(err.error?.message || "Failed to update password");
    }
  });
}
}

