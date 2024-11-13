import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    // console.log('token recuperado interceptor: ' + token);
    const url = request.url;
    // console.log('url recuperado interceptor: ' + url);

    if (token) {
      // console.log('url: ' + url);
      const jwt = token;
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      })
    }
    return next.handle(request);
  }

}
