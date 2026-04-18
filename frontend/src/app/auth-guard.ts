import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    // check karo ke user login che ke nai
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
      return true; // allow access
    } else {
      this.router.navigate(['/login']); // redirect to login
      return false;
    }
  }
}