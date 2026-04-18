import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductDetail } from '../services/product-detail';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-product.html',
  styleUrl: './my-product.css',
})
export class MyProduct implements OnInit {

  constructor(private product: ProductDetail,
    private cdr: ChangeDetectorRef, private router: Router
  ){}

  products:any[] = [];
  filteredProducts:any[] = [];
  selectedCategory:string = 'All';

  showDeleteModal=false;
  showEditModal=false;
  editProductData:any={};
  deleteId:any;

  // Pagination vars
  currentPage: number = 1;
  itemsPerPage: number = 6;

  categories = ['All','Vegetables','Fruits','Green Vegetables','Root Vegetables'];

  ngOnInit() {

  const farmerId = localStorage.getItem("farmerId");

  if (!farmerId) {
    console.error("Farmer not found in localStorage");
    return;
  }

  const f_id = Number(farmerId);

  console.log(localStorage.getItem("farmerId"));
  this.product.getMyProducts(f_id)
    .subscribe((data:any)=>{
    console.log(data);
    this.products = data;
    this.filteredProducts = data;
    this.cdr.detectChanges();
});
}

  

  filterCategory(cat:string){
    this.selectedCategory = cat;
    this.currentPage = 1; // Reset to page 1 on filter

    if(cat === 'All'){
      this.filteredProducts = this.products;
    }else{
      this.filteredProducts = this.products.filter(p => p.category === cat);
    }
  }

  // Pagination Logic
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.setPage(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 1) this.setPage(this.currentPage - 1);
  }

 confirmDelete(){

  this.product.deleteProduct(this.deleteId).subscribe(()=>{

    this.products = this.products.filter(p=>p.product_id!==this.deleteId);
    this.filteredProducts = this.filteredProducts.filter(p=>p.product_id!==this.deleteId);

    this.showDeleteModal=false;

  });

}

openDelete(id:any){
  this.deleteId=id;
  this.showDeleteModal=true;
}

closeDelete(){
  this.showDeleteModal=false;
}

updateProduct(){

this.product.updateProduct(
this.editProductData.product_id,
this.editProductData
).subscribe(()=>{

const index=this.products.findIndex(
p=>p.product_id===this.editProductData.product_id
);

this.products[index]=this.editProductData;
this.filteredProducts[index]=this.editProductData;

this.showEditModal=false;

});

}

openEdit(product:any){

this.editProductData={...product}; 
this.showEditModal=true;

}

closeEdit(){
this.showEditModal=false;
}


}
