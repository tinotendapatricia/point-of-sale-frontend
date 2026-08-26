import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  private authService: any;

  constructor(public inj: Injector) {
    this.authService = inj.get(AuthenticationService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('accessToken')) {
      request = this.addAuthHeader(request);
    }
    if (sessionStorage.getItem('license')) {
      request = this.addKey(request);
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((error) => this.handleResponseError(error))
    );
  }

  handleResponseError(error: any) {
    if (error instanceof HttpErrorResponse) {
      switch ((<HttpErrorResponse>error).status) {
        
        case 401:
          Utilities.displayToast(
            'error',
            error.error.message
              ? error.error.message
              : 'Sorry, you are not authorized to perform this action.'
          );
          this.logoutUser();
          break;
        case 403:
          Utilities.displayToast(
            'info',
            error.error.message
              ? error.error.message
              : 'Sorry, you are not authorized to perform this action.'
          );
          break;
          case 404:
            Utilities.displayToast(
              'error',
              error.error.message
                ? error.error.message
                : 'Sorry, you are not authorized to perform this action.'
            );
            break;
            case 405:
            Utilities.displayToast(
              'info',
              error.error.message
                ? error.error.message
                : 'Sorry, you are not authorized to perform this action.'
            );
            break;
        
        default:
          Utilities.displayToast(
            'error',
            error.error.message
              ? error.error.message
              : 'Sorry, there were some technical issues while processing your request. Please try again, or contact support.'
          );
          return throwError(() => error);
      }
    }
    return throwError(() => error);
  }



  logoutUser() {
    this.authService.logout();
    return EMPTY;
  }

  private addAuthHeader(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });
  }

  private addKey(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        "Key": `Bearer ${sessionStorage.getItem('license')}`,
      },
    });
  }
}
