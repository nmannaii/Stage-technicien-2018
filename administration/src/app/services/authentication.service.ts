import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';
import {Urls} from "./Urls";
@Injectable()
export class AuthenticationService {
  private _URL = Urls._AuthURL;
  constructor(private http: HttpClient) { }

  login(authData): Observable<Admin> {
    return this.http.post<Admin>(this._URL, {login: authData.login, password: authData.password});
  }
}
