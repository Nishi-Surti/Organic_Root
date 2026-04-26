import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminLogin } from '../services/admin-login';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  totalFarmers: number = 0;
  totalProducts: number = 0;
  totalOrders: number = 0;
  totalUser: number = 0;

  constructor(
    private adminLogin: AdminLogin,
    private router: Router,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.adminLogin.getTotalFarmers().subscribe((res: any) => {
      // console.log(res);

      this.totalFarmers = res.totalFarmers;

      this.cd.detectChanges();
    });

    this.adminLogin.getTotalProducts().subscribe((res: any) => {
      // console.log(res);

      this.totalProducts = res.totalProducts;

      this.cd.detectChanges();
    });

    this.adminLogin.getTotalOrders().subscribe((res: any) => {
      // console.log(res);
      this.totalOrders = res.totalOrders;
      this.cd.detectChanges();
    });

    this.adminLogin.getTotalUser().subscribe((res: any) => {
      // console.log(res);
      this.totalUser = res.totalUser;
      this.cd.detectChanges();
    });

    this.fetchAllOrders();

    this.getTotalUsers();

    this.cd.detectChanges();
  }

  searchText = '';
  selectedStatus = '';

  currentPage = 1;
  itemsPerPage = 5;

  recentOrders: any[] = [];

  getTotalUsers() {
    let farmerCount = 0;
    let consumerCount = 0;

    // 👨‍🌾 Farmers
    this.http.get('http://localhost:3000/admin/farmers').subscribe((res: any) => {
      farmerCount = res.length || 0;

      // 🧑 Consumers
      this.http.get('http://localhost:3000/admin/consumers').subscribe((res2: any) => {
        consumerCount = res2.length || 0;

        // ✅ TOTAL USERS
        this.totalUser = farmerCount + consumerCount;

        // console.log("Farmers:", farmerCount);
        // console.log("Consumers:", consumerCount);
        // console.log("Total Users:", this.totalUser);
      });
    });
  }

  fetchAllOrders() {
    this.http.get('http://localhost:3000/admin/allOrders').subscribe({
      next: (res: any) => {
        // console.log("ALL ORDERS:", res);

        this.recentOrders = res.map((o: any) => ({
          id: o.order_id,
          product: o.pname,
          customer: o.cname,
          farmer: o.farmerName, // ✅ NEW
          price: o.totalPrice,
          status: o.orderStatus,
        }));

        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get filteredOrders() {
    let data = [...this.recentOrders];

    /* SEARCH */

    if (this.searchText) {
      data = data.filter(
        (o) =>
          o.customer.toLowerCase().includes(this.searchText.toLowerCase()) ||
          o.product.toLowerCase().includes(this.searchText.toLowerCase()),
      );
    }

    /* FILTER */

    if (this.selectedStatus) {
      data = data.filter((o) => o.status === this.selectedStatus);
    }

    return data;
  }

  /* PAGINATION */

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  /* PAGE COUNT */

  get pages() {
    const total = Math.ceil(this.filteredOrders.length / this.itemsPerPage);

    return Array(total)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }

  approveFarmers() {
    this.router.navigate(['/approve-farmers']);
  }

  viewOrders() {
    this.router.navigate(['/admin-order']);
  }

  manageProducts() {
    this.router.navigate(['/admin-product']);
  }

  navigateAndClose(path: string) {
    this.router.navigate([path]);

    // sidebar close trigger (IMPORTANT)
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  }
}
