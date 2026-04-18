import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminLogin } from '../services/admin-login';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-order.html',
  styleUrl: './admin-order.css',
})
export class AdminOrder implements OnInit {
  searchText = '';
  selectedStatus = 'All';

  currentPage = 1;
  itemsPerPage = 5;

  totalOrders: number = 0;
  placedOrders: number = 0;
  deliveredOrders: number = 0;
  totalEarnings: number = 0;

  constructor(private adminLogin: AdminLogin, private router: Router,
              private cd: ChangeDetectorRef,private http: HttpClient) {}

  ngOnInit()
  {
    this.adminLogin.getTotalEarnings().subscribe((res:any)=>{
    console.log("DASHBOARD:", res);

    this.totalOrders = res.totalOrders;
    this.placedOrders = res.placedOrders;
    this.deliveredOrders = res.deliveredOrders;
    this.totalEarnings = res.totalEarnings;

    this.cd.detectChanges();
  });
    this.fetchAllOrders();
  };

  recentOrders: any[] = [];

  fetchAllOrders() 
  {
  this.http.get("http://localhost:3000/admin/allOrders")
    .subscribe({
      next: (res: any) => {

        console.log("ALL ORDERS:", res);

        this.recentOrders = res.map((o: any) => ({
        id: o.order_id,
        products: o.pname,   // ✅ FIX
        customer: o.cname,
        total: o.totalPrice, // ✅ FIX
        paymentMethod : o.paymentMethod,
         payment: 
    o.paymentMethod !== 'cod' || o.orderStatus === 'Delivered'
      ? 'Paid'
      : 'Unpaid',
        status: o.orderStatus
      }));

        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
}
  

get paginatedOrders(){

const start = (this.currentPage - 1) * this.itemsPerPage;

return this.filteredOrders.slice(start, start + this.itemsPerPage);

}

get filteredOrders()
{

  let data = [...this.recentOrders];

  /* SEARCH */

  if(this.searchText)
  {
    data = data.filter(o =>
    o.customer.toLowerCase().includes(this.searchText.toLowerCase()) ||
    o.products.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /* FILTER */

  if(this.selectedStatus !== 'All')
{
  data = data.filter(o => o.status === this.selectedStatus);
}

  return data;

}

}
