import { UserService } from './../user/user.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  sessionId?: string;

  constructor(private _userService: UserService) {
    this._userService.userSubj.subscribe((user) => {
      if (user) {
        this.sessionId = user.sessionId;
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._userService.isLoggedIn) {
      req = req.clone({
        params: new HttpParams({ fromString: `session_id=${this.sessionId}` }),
      });
    }

    return next.handle(req);
  }
}
