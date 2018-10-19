import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
      if (localStorage.getItem('id')) {
          // logged in so return true
          return true;
      }
      // Re Direct to login page when token is not present
      window.location.href="/adminLogin";
      return false;
  }
}

