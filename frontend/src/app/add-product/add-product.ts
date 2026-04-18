import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminManagecategory } from '../services/admin-manage-category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  @Output() productAdded = new EventEmitter();

  productForm!: FormGroup;
  selectedImage: File | null = null;
  fileName: string = 'Choose Image';
  imagePreview: any;
  showPreview: boolean = false;

  categories:any[] = [];

  errorMessage: string = '';
imageError: boolean = false;
// selectedImage: File | null = null;

  constructor(private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private http: HttpClient,
  private cat: AdminManagecategory,
  private router: Router) 
  {}
ngOnInit(){
  this.productForm = this.fb.group({
    category: ['', Validators.required],
    pname: ['', Validators.required],
    price: ['', Validators.required],
    priceUnit: ['', Validators.required],
    quantity: ['', Validators.required],
    quantityUnit: ['', Validators.required]
});

this.loadCategory();
}

loadCategory(){

this.cat.getCategory().subscribe((res:any)=>{
  this.categories = res;
  console.log("Categories:", this.categories);
   this.cd.detectChanges();
})


}
    

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


onlyNumber(event:any){

  let value = event.target.value;

  // allow only numbers
  value = value.replace(/[^0-9]/g,'');

  event.target.value = value;
}
  
  onSubmit() {

  this.errorMessage = '';
  this.imageError = false;

  // ✅ form validation
  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  // ✅ image validation
  if (!this.selectedImage) {
    this.imageError = true;
    return;
  }

  const formData = new FormData();

  formData.append("category", this.productForm.value.category);
  formData.append("pname", this.productForm.value.pname);
  formData.append("price", this.productForm.value.price);
  formData.append("priceUnit", this.productForm.value.priceUnit);
  formData.append("quantity", this.productForm.value.quantity);
  formData.append("quantityUnit", this.productForm.value.quantityUnit);
  formData.append("f_id", localStorage.getItem("farmerId") || "");

  formData.append("pimg", this.selectedImage);

  this.http.post("http://localhost:3000/api/productDetail/add-product", formData)
    .subscribe({
      next: (res) => {
        alert('Product Add Successfully');
        // ✅ success message UI thi batavvu hoy to
        this.router.navigate(['/farmers/farmer-dashboard']);
      },
      error: (err) => {
        this.errorMessage = "Something went wrong. Try again!";
      }
    });
}
}

