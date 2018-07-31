import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  public authForm: FormGroup;
  public login: string;
  public password: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    public snackBar: MatSnackBar) { 
    this.authForm = formBuilder.group({
      'login' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  signIn(authData) {
    this.authService.login(authData).subscribe((data)=> {
      if (data.authorized) {
        localStorage.setItem("token", data.token);
        this.snackBar.open("Bienvenu","Ok", {
          duration: 2000
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open(data.message,"Ok", {
          duration: 2000
        });
      }
    });
  }

}
