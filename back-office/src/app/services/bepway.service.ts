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
  readonly url = "https://bepway.azurewebsites.net/api";
  readonly token: string;

  constructor(private http: HttpClient) {}

  private handleError(response: HttpErrorResponse) {
    let error: string;
    if (response.error instanceof ErrorEvent) {
      // client-side or network error
      error = "An error occurred. Please check your connection and try again.";
    } else {
      // unsuccessfull code returned by backend
      error = "An error occurred while requesting the data.";
    }
    return throwError(error);
  }

  public getToken(login: LoginModel) {
    const httpOptions = { 
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    
    this.http.post<Token>(`${this.url}/jwt`, login, httpOptions).pipe(
      retry(5),
      catchError(this.handleError)
    );
  }

  public getUsers(pageIndex = 0, pageSize = 15, userName?: string) {
    if (this.token === null) throw new NoTokenException();

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      )
    }
    
    return this.http.get<User>(`${this.url}/user?pageIndex=${pageIndex}&pageSize=${pageSize}${userName !== null ? "userName="+userName : ""}`, httpOptions);
  }
}
