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
 

  constructor(private fb: FormBuilder,
    private router: Router,
    private farmerLogin: FarmerLogin,
    private consumerLogin: ConsumerLogin,
    private auth: Auth
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
    alert("Please fill valid details");
    return;
  }

  if(this.selectedRole === 'farmer'){

    this.farmerLogin.farmerLogin(this.loginForm.value)
      .subscribe({
        next:(res:any)=>{
          this.auth.loginAs('Farmer');
          alert("Farmer Login Successfully ✅");

          localStorage.setItem('token', 'userLoggedIn');
          localStorage.setItem("farmerId", res.farmer_login.f_id);
          localStorage.setItem("farmerName", res.farmer_login.name);
          localStorage.setItem("farmerVillage", res.farmer_login.village);

          this.router.navigate(['/farmers']);
        },
        error:(err)=>{
          alert("Invalid Farmer Credentials ❌");
        }
      });
  }

  else if(this.selectedRole === 'consumer'){

    this.consumerLogin.consumerLogin(this.loginForm.value)
      .subscribe({
        next:(res:any)=>{
          this.auth.loginAs('Consumer');
          alert("Consumer Login Successfully ✅");


          localStorage.setItem('token', 'userLoggedIn');
          localStorage.setItem("consumerId", res.consumer_login.c_id);
          localStorage.setItem("consumerName", res.consumer_login.name);
          
          this.router.navigate(['/consumer']);
        },
        error:(err)=>{
          alert("Invalid Consumer Credentials ❌");
        }
      });
  }

  else if(this.selectedRole === 'admin'){

    this.auth.loginAdmin(adminData)
      .subscribe({
        next:(res:any)=>{
          this.auth.loginAs('Admin');
          alert("Admin Login Successfully ✅");
          localStorage.setItem('token', 'userLoggedIn');
          this.router.navigate(['/admin']);
        },
        error:(err)=>{
          alert("Invalid Admin Credentials ❌");
        }
      });
  }

}
}

