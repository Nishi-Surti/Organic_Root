import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  productForm!: FormGroup;
  selectedImage: File | null = null;
   imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      pname: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      pimg: [null]
    });
  }

// imagePreview:any;
fileName:string = '';
selectedFile!:File;

onImageSelect(event:any){

  const file = event.target.files[0];

  if(file){
    this.selectedFile = file;
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      alert('Product Added Successfully');
    }
  }
}
