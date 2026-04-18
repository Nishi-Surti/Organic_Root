import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-farmer-order-track',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './farmer-order-track.html',
  styleUrl: './farmer-order-track.css',
})
export class FarmerOrderTrack {
  searchText: string = '';
  statusFilter: string = '';

  orders: any[] = [];
  filteredOrders: any[] = [];
  expandedOrderId: number | null = null;

  // Pagination vars
  currentPage: number = 1;
  itemsPerPage: number = 2;

  constructor(
    private http: HttpClient,
    private crd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const farmerId = localStorage.getItem('farmerId');

    this.http.get(`http://localhost:3000/api/farmer-orders/${farmerId}`).subscribe((res: any) => {
      console.log('Farmer Orders:', res);

      // 🔥 IMPORTANT mapping (backend → UI)
      this.orders = res.map((o: any) => ({
        id: o.order_id,
        product: o.pname,
        customer: o.cname,
        quantity: o.quantity + ' ' + o.quantityUnit,
        price: '₹' + ' ' + o.totalPrice + ' / ' + o.priceUnit,
        date: new Date(o.orderDate).toLocaleDateString(),
        status: o.orderStatus, // future dynamic
        image: 'http://localhost:3000' + o.pimg,
      }));

      this.filteredOrders = [...this.orders];
      this.crd.detectChanges();
    });
  }

  searchOrders() {
    this.currentPage = 1; // Reset to first page
    this.filteredOrders = this.orders.filter(
      (order) =>
        order.product.toLowerCase().includes(this.searchText.toLowerCase()) ||
        order.customer.toLowerCase().includes(this.searchText.toLowerCase()) ||
        order.id.toString().toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  applyFilter() 
  {
    this.currentPage = 1; // Reset to first page
    this.filteredOrders = this.orders.filter((order) => {
      const searchMatch =
        order.product.toLowerCase().includes(this.searchText.toLowerCase()) ||
        order.customer.toLowerCase().includes(this.searchText.toLowerCase()) ||
        order.id.toString().toLowerCase().includes(this.searchText.toLowerCase());

      const statusMatch = this.statusFilter === '' || order.status === this.statusFilter;

      return searchMatch && statusMatch;
    });
  }

  // Pagination Logic
  get paginatedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
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

  toggleOrderDetails(orderId: number) {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null; // Collapse if already open
    } else {
      this.expandedOrderId = orderId; // Expand
    }
  }

  updateOrder(event: any, orderId: number) {

  const newStatus = event.target.value;
  if (!newStatus) return;

  this.http.put(`http://localhost:3000/api/update-order-status/${orderId}`, {
    status: newStatus
  }).subscribe({
    next: () => {

      // ✅ update main array
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
      }

      // ✅ IMPORTANT: filteredOrders ne bhi update karo
      const fOrder = this.filteredOrders.find(o => o.id === orderId);
      if (fOrder) {
        fOrder.status = newStatus;
      }

      // OPTIONAL refresh
      this.applyFilter();
      this.ngOnInit();

    },
    error: (err) => {
      console.log("Update Error:", err);
    }
  });
}


}
