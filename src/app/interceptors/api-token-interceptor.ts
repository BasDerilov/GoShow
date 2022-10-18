import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  API_KEY = '8a085c8b2a167e569b04c38684d24e6a';
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newParams = req.params.append('api_key', this.API_KEY);
    req = req.clone({
      params: newParams,
    });

    return next.handle(req);
  }
}
