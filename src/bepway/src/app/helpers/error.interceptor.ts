import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../components/data-access';
import { MessageService } from '../services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse )=> {
            // ADAPTER POUR GESTION PAR API CONTROLLER
            // console.log(err);
            const issue = err.error;

            if (err.status === 401) {                                       // auto logout if 401 response returned from API
                DataAccess.clearStorage();
                location.reload(true);                
            } else if (err.status === 404 || err.status === 400) {          // error message (login but is currently handling everything)
                this.log("The login or password is wrong");
            } else if (err.status === 409) {                                // error message for concurrency issue
                this.log("This has already been edited! Reload your page...");
            } else {
                this.log(`An unknown error occurred (${err.status}).`);     // unknown error
            }
            
            const error = issue.title || err.statusText;
            return of(error);//return throwError(error);
        }))
    }

    private log (message: string) {
        this.messageService.add(message, "alert alert-danger");
    }
}
// src for classnames: https://getbootstrap.com/docs/4.0/components/alerts/
