import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Token, Company, Zoning, User, LoginModel } from '../model/Models';
import { ModelError } from '../model/classes/ModelError';
import { NoTokenException } from '../exceptions/exception';
import { StorageAccessor } from './StorageAccessor';

@Injectable({ providedIn: 'root' })
export class BepwayService {
  readonly PAGEINDEX_DEFAULT = 0;
  readonly PAGESIZE_DEFAULT = 15;
  readonly url = "https://bepway.azurewebsites.net/api";

  constructor(private http: HttpClient, private messageService: MessageService) {}

  private getHttpOptions() {
    const token = StorageAccessor.deserializeStorage<Token>(StorageAccessor.TOKEN_KEY);
    if (!token) throw new NoTokenException();

    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.accessToken}`
        }
      )
    };
  }

  public getToken(user: LoginModel): Observable<Token> {
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
      //console.log(response);
      if (response instanceof HttpErrorResponse) {
        if (response.status == 404 || response.status == 400) {
          this.log("The login or password is wrong.")
        } else {
          this.log("An unknown error occurred.");
        }
      }
      return of(result as T);
    };
  }

  private log (message: string) {
    this.messageService.add(message);
  }
}
