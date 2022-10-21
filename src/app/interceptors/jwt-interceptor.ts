import { UserService } from './../user/user.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  sessionId?: string;

  constructor(private _userService: UserService) {
    this._userService.user.subscribe((session) => {
      if (session) {
        this.sessionId = session.sessionId;
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._userService.isLoggedIn) {
      const newParams = req.params.append('session_id', this.sessionId!);
      req = req.clone({
        params: newParams,
      });
    }

    return next.handle(req);
  }
}
