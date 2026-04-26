import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminLogin } from '../services/admin-login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user.html',
  styleUrl: './admin-user.css',
})
export class AdminUser implements OnInit {
  users: any[] = [];
  userType: string = 'farmer';
  totalUsers: number = 0;
  // userType: string = 'farmer';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedUsers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminLogin: AdminLogin,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userType = params['type'] || 'farmer';
      this.fetchUsers();
      this.getTotalUsers();
      // this.cd.detectChanges();
    });
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  onRoleChange() {
    // 🔥 1. direct API call karo
    this.fetchUsers();
    this.cd.detectChanges();

    // 🔥 2. pachhi URL update karo
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: this.userType },
    });
  }

  selectedRole: string = 'farmer';
  fetchUsers() {
    // console.log('Current Type:', this.userType); // 👀 check

    if (this.userType === 'farmer') {
      // console.log("Calling Farmer API");
      this.http.get('http://localhost:3000/admin/farmers').subscribe((res: any) => {
        // console.log("Farmer Data:", res);
        this.users = res;
        this.currentPage = 1;
        this.updatePagination();
        this.cd.detectChanges();
      });
    } else {
      // console.log("Calling Consumer API");
      this.http.get('http://localhost:3000/admin/consumers').subscribe((res: any) => {
        // console.log('Consumer Data:', res);
        this.users = res;

        this.currentPage = 1;
        this.updatePagination();
        this.cd.detectChanges();
      });
    }
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  toggleBlock(user: any) {
    const newStatus = user.status === 'blocked' ? 'active' : 'blocked';

    this.http
      .put(`http://localhost:3000/admin/block-user/${user._id}`, { status: newStatus })
      .subscribe(() => {
        user.status = newStatus; // 🔥 UI update
        this.updatePagination();
        this.cd.detectChanges(); // pagination refresh
      });
  }

  getTotalUsers() {
    this.http.get('http://localhost:3000/admin/total-users').subscribe((res: any) => {
      this.totalUsers = res.totalUsers;
    });
  }

  showModal = false;
  selectedUser: any = null;
  actionType: string = '';

  openModal(user: any, action: string) {
    this.selectedUser = user;
    this.actionType = action;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

  confirmAction() {
    if (this.actionType === 'block') {
      this.toggleBlock(this.selectedUser);
    } else if (this.actionType === 'delete') {
      this.deleteUser(this.selectedUser._id);
    }

    this.closeModal();
  }

  deleteUser(id: string) {
    this.http.delete(`http://localhost:3000/admin/delete-user/${id}`).subscribe(() => {
      this.users = this.users.filter((u) => u._id !== id);
      this.updatePagination?.(); // jo pagination hoy to
    });
  }
}
