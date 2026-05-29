import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const isLoggedIn = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (isLoggedIn && role) {
      const url = state.url;

      if (url.startsWith('/admin') && role !== 'Admin') {
        this.router.navigate(['/login']);
        return false;
      }

      if (url.startsWith('/farmers') && role !== 'Farmer') {
        this.router.navigate(['/login']);
        return false;
      }

      if (url.startsWith('/consumer') && role !== 'Consumer') {
        this.router.navigate(['/login']);
        return false;
      }

      return true; // allow access
    } else {
      this.router.navigate(['/login']); // redirect to login
      return false;
    }
  }
}