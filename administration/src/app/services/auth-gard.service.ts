import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGardService implements CanActivate{
  constructor(private router: Router, private snackBar: MatSnackBar) { }
  
  isLoggedIn(): boolean {
    if(localStorage.getItem('token')===null) {
        this.snackBar.open('Vous devez être connecté pour accéder', 'OK',{duration: 4000});
        this.router.navigate(['']);
        return false;
    }
    return true
  }

  canActivate() {
      return this.isLoggedIn();
  }
}