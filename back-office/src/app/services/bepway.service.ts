import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Token, Company, Zoning, User, LoginModel } from '../model/Models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BepwayService {
  readonly url = "https://bepway.azurewebsites.net/api";
  readonly token: string;

  constructor(private http: HttpClient) {}

  public getToken(login: LoginModel) {
    const httpOptions = { 
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    
    this.http.post<Token>(`${this.url}/jwt`,login,httpOptions).pipe(
      //catchError()
    );
  }

  public getUsers(pageIndex: number, pageSize: number, userName: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      )
    }
    return this.http.get<User>(`${this.url}/user?pageIndex=${pageIndex}&pageSize=${pageSize}${userName !== null ? "userName="+userName : ""}`,httpOptions);
  }
}
