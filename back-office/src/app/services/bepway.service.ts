import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Token, Company, Zoning, User, LoginModel } from '../model/Models';
import { NoTokenException } from '../exceptions/exception';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BepwayService {
  readonly PAGEINDEX_DEFAULT = 0;
  readonly PAGESIZE_DEFAULT = 17;
  readonly url = "https://bepway.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  private getTokenFromStorage(): Token {
    return JSON.parse(localStorage.getItem("token"));
  }

  private getHeaders (): {} {
    const token = this.getTokenFromStorage();
    if (!token) throw new NoTokenException();

    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getTokenFromStorage().accessToken}`
        }
      )
    };
  }

  public getToken(user: LoginModel): Observable<Token> {
    const httpOptions = { 
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    
    return this.http.post<Token>(`${this.url}/jwt`, user, httpOptions);
  }

  public getUser(login: string): Observable<User> {
    const httpOptions = this.getHeaders();
    return this.http.get<User>(`${this.url}/user/${login}`, httpOptions);
  }

  public getUsers(pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT, userName?: string) {
    const httpOptions = this.getHeaders();
    return this.http.get<User>(`${this.url}/user?pageIndex=${pageIndex}&pageSize=${pageSize}${userName !== null ? "&userName="+userName : ""}`, httpOptions);
  }

  public getAllCompanies(pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT){
    const httpOptions = this.getHeaders();
    return this.http.get<Company>(`${this.url}/companies?pageIndex=${pageIndex}&pageSize=${pageSize}`, httpOptions);
  }

  public getAllCompaniesByZoning(pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT, zoningId: number){
    const httpOptions = this.getHeaders();
    return this.http.get<Company>(`${this.url}/companies?pageIndex=${pageIndex}&pageSize=${pageSize}&zoningId=${zoningId}`, httpOptions);
  }
}
