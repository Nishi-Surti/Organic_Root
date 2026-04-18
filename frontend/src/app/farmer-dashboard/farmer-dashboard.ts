import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './farmer-dashboard.html',
  styleUrl: './farmer-dashboard.css',
})
export class FarmerDashboard implements OnInit {
  showAddProductPopup = false;
  farmerName: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private crd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.farmerName = localStorage.getItem('farmerName');
    this.route.queryParams.subscribe((params) => {
      if (params['/farmers/addProduct'] === 'true') {
        this.showAddProductPopup = true;
      }
    });

    this.fetchRecentOrders();
  }

  openAddProductPopup() {
    this.showAddProductPopup = true;
  }

  closePopup() {
    this.showAddProductPopup = false;
  }

  recentOrders: any[] = [];

  fetchRecentOrders() 
  {
    const farmerId = localStorage.getItem('farmerId');
    this.http.get(`http://localhost:3000/api/recent-orders/${farmerId}`).subscribe({
      next: (res: any) => {
        console.log('RECENT ORDERS:', res); // 🔥 DEBUG

        this.recentOrders = res.map((o: any) => ({
          id: o.order_id,
          product: o.pname,
          customer: o.cname,
          total: o.totalPrice,
          date: new Date(o.orderDate).toLocaleDateString(),
          status: o.orderStatus,

          // 🔥 Ensure UI updates after data change
        }));
        this.crd.detectChanges();
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
  

  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages() 
  {
    return Math.ceil(this.recentOrders.length / this.itemsPerPage);
  }

  get paginatedOrders() 
  {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.recentOrders.slice(start, end);
  }

  nextPage() 
  {
    if (this.currentPage < this.totalPages) 
    {
      this.currentPage++;
    }
  }

  prevPage() 
  {
    if (this.currentPage > 1)
    {
      this.currentPage--;
    }
  }

  logout() 
  {
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
