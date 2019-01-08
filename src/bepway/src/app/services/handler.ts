// // Error handling
// private handleError<T> (result? : T) {
//     return (response: any): Observable<T> => {
//         //console.log(response);
//         if (response instanceof HttpErrorResponse) {
//             if (response.status == 404 || response.status == 400) {
//                 this.log("The login or password is wrong.")
//             } else if (response.status == 409) {
//                 this.log("Someone already changed that! Refresh your page...");
//             } else
//                 this.log(`An unknown error occurred (${response.status}).`);
//             }
//         }
//         return of(result as T);
//     };
// }

// private log (message: string) {
//     this.messageService.add(message);
// }