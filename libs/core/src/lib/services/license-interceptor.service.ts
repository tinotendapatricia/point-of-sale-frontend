import {  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LicenseInterceptorService implements HttpInterceptor{

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ):any {
    if (sessionStorage.getItem('accessToken')) {
      request = this.addAuthHeader(request);
    }
  }

  private addAuthHeader(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        "KEY": `Bearer ${sessionStorage.getItem('license')}`
        
      },
    });
  }

}
