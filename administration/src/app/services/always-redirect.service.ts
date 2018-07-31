import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlwayseRedirectService implements CanActivate{
  constructor(private router: Router) { }
  
  isLoggedIn(): boolean {
    if(localStorage.getItem('token')!==null) {
        this.router.navigate(['/dashboard']);
    }
    return true
  }

  canActivate() {
      return this.isLoggedIn();
  }
}