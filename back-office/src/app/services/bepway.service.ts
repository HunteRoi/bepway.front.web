import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Token, Company, Zoning, User, LoginModel, ModelError } from '../model/Models';
import { NoTokenException } from '../exceptions/exception';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { ModelError as Error } from '../model/classes/ModelError';

@Injectable({
  providedIn: 'root'
})
export class BepwayService {
  readonly PAGEINDEX_DEFAULT = 0;
  readonly PAGESIZE_DEFAULT = 15;
  readonly url = "https://bepway.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  private getTokenFromStorage(): Token {
    return JSON.parse(localStorage.getItem("token"));
  }

  private getHttpOptions (): {
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    observe?: 'body';
    params?: { [param: string]: string | string[]; };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } {
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

  public getToken(user: LoginModel): Observable<Token | ModelError> {
    const httpOptions = { 
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    
    return this.http.post<Token>(`${this.url}/jwt`, user, httpOptions).pipe(
      catchError(this.handleError(undefined))
    );
  }

  public getUser(login: string): Observable<User> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<User>(`${this.url}/user/${login}`, httpOptions).pipe(
      catchError(this.handleError(undefined))
    );
  }

  public getUsers(pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT, userName?: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get<User>(`${this.url}/user?pageIndex=${pageIndex}&pageSize=${pageSize}${userName !== null ? "&userName="+userName : ""}`, httpOptions);
  }

  public getAllCompanies(pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT): Observable<Company>{
    const httpOptions = this.getHttpOptions();
    return this.http.get<Company>(`${this.url}/Company?pageIndex=${pageIndex}&pageSize=${pageSize}`, httpOptions);
  }

  public getAllCompaniesByZoning(zoningId: number, pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT): Observable<Company[]>{
    const httpOptions = this.getHttpOptions();
    return this.http.get<Company[]>(`${this.url}/Company?pageIndex=${pageIndex}&pageSize=${pageSize}&zoningId=${zoningId}`, httpOptions);
  }

  public getAllZonings(pageIndex = this.PAGEINDEX_DEFAULT, pageSize = this.PAGESIZE_DEFAULT): Observable<Zoning[]>{
    const httpOptions = this.getHttpOptions();
    return this.http.get<Zoning[]>(`${this.url}/Zoning?pageIndex=${pageIndex}&pageSize=${pageSize}`, httpOptions);
  }

  // Error handling
  private handleError<T> (result? : T) {
    return (response: any): Observable<T> => {
      if (response instanceof HttpErrorResponse)
        console.log(response.error);
        if (response.error instanceof Error && response.error['message']) console.log(response.error.message);
      
        return of(result as T);
    };
  }
}
