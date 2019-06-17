import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  sendToken(email: string, role: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  getRole() {
    return localStorage.getItem('role');
  }
  isLoggedIn() {
    return this.getEmail() !== null && this.getRole() !== null;
  }
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  // isAuthorized() {
  //   return true;
  // }
  isAdmin() {
    if (localStorage.getItem('role') === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
  isUser() {
    if (localStorage.getItem('role') === 'User') {
      return true;
    } else {
      return false;
    }
  }
}
