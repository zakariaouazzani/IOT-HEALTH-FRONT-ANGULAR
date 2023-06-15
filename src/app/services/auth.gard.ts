import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.storage.getToken();

    if (token) {
      // Token exists, allow access to the route
      return true;
    } else {
      // Token doesn't exist, redirect to the login page or any other desired route
      this.router.navigate(['/']);
      return false;
    }
  }
  

  canNotActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.storage.getToken();

    if (token) {
      // Token exists, redirect to the dashboard or any other desired route
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      // Token doesn't exist, allow access to the route
      return true;
    }
  }
}
