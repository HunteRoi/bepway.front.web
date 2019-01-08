import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../components/data-access';
import { MessageService } from '../services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {                                       // auto logout if 401 response returned from api
                DataAccess.clearStorage();
                location.reload(true);                
            } else if (err.status === 404 || err.status === 400) {          // login error message
                this.log("The login or password is wrong");
            } else {
                this.log(`An unknown error occurred (${err.status}).`);     // unknown error
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    private log (message: string) {
        this.messageService.add(message, "error");
    }
}