import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { Adminproduct } from '../services/admin-product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-product.html',
  styleUrl: './admin-product.css',
})
export class AdminProduct implements OnInit {
  
  products: any[] = [];
  filteredProducts: any[] = [];
  searchText = '';

  constructor(private service: Adminproduct,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.cdr.detectChanges();
      
    });
  }

  deleteProduct(id: string) {
    if(confirm("Are you sure to delete?")) {
      this.service.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  searchProduct() {
    this.filteredProducts = this.products.filter(p =>
      p.pname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

