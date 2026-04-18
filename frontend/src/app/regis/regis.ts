import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router , RouterModule } from '@angular/router';
import { Register } from '../services/register';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regis',
  imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterModule],
  standalone: true,
  templateUrl: './regis.html',
  styleUrl: './regis.css',
})
export class Regis {
  registerForm!: FormGroup;
  role = '';

  selectedImage: File | null = null;
  fileName: string = 'Choose Image';
  imagePreview: any;
  showPreview: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private regService: Register,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      // ✅ NAME → only letters + spaces
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],

      // ✅ MOBILE → already correct
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],

      // Farmer
      village: [''],

      // Consumer
      address: [''],

      city : ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],

      pincode : ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],

      // ✅ PASSWORD → min 6 + strong
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@#$%^&*]{6,}$'),
        ],
      ],

      fimage: [''],
    });
  }

 selectRole(selectedRole: string) 
 {
  this.role = selectedRole;

  if (selectedRole === 'farmer') {

    this.registerForm.get('village')?.setValidators([
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]);

    this.registerForm.get('address')?.clearValidators();

  } 
  else 
  {

    this.registerForm.get('address')?.setValidators([
      Validators.required,
      Validators.pattern('^[A-Za-z0-9 ,.-]+$')
    ]);

    this.registerForm.get('city')?.setValidators([
      Validators.required,
      Validators.pattern('^[A-Za-z]+$')
    ]);

    this.registerForm.get('pincode')?.setValidators([
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]);

    this.registerForm.get('village')?.clearValidators();
  }

  this.registerForm.get('village')?.updateValueAndValidity();
  this.registerForm.get('address')?.updateValueAndValidity();
  this.registerForm.get('city')?.updateValueAndValidity();
  this.registerForm.get('pincode')?.updateValueAndValidity();
}
  onSubmit() 
  {
    if (this.registerForm.invalid) 
    {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (!this.role) {
      alert('Please select role');
      return;
    }

    if (this.role === 'farmer') {
      const formData = new FormData();

      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('mobile', this.registerForm.get('mobile')?.value);
      formData.append('village', this.registerForm.get('village')?.value);
      formData.append('password', this.registerForm.get('password')?.value);

      if (this.selectedImage) {
        formData.append('fimage', this.selectedImage);
      }

      this.regService.registerFarmer(formData).subscribe({
        next: () => {
          alert('Farmer Registration Successfully');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          alert('Error while registering farmer');
        },
      });
    } else if (this.role === 'consumer') {
      const Data = {
        name: this.registerForm.get('name')?.value,
        mobile: this.registerForm.get('mobile')?.value,
        address: this.registerForm.get('address')?.value,
        city : this.registerForm.get('city')?.value,
        pincode : this.registerForm.get('pincode')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.regService.registerConsumer(Data).subscribe({
        next: () => {
          alert('Consumer Registration Successfully');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          alert('Error occured during consumer registration');
        },
      });
    }
  }
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // selectedImage: File | null = null;
  // imagePreview: string | ArrayBuffer | null = null;

  // onImageSelect(event: any)
  // { const file = event.target.files[0];
  //   if(file)
  //   { this.selectedImage = file;
  //      this.registerForm.patchValue({fimage: file});
  //      const reader = new FileReader();
  //      reader.readAsDataURL(file);
  //   }
  // }

  onImageSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;

      // ✅ immediately show name
      this.fileName = file.name;

      this.showPreview = false;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;

        // ✅ FORCE UI UPDATE
        this.cd.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
  /* 👁 CLICK */
  togglePreview(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.imagePreview) return;

    this.showPreview = !this.showPreview;
  }
}
