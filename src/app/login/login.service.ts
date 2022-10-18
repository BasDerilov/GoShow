import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = 'https://api.themoviedb.org/3/';
  credentialsValid = new Subject<boolean>();

  constructor(private _http: HttpClient) {}

  private getAuthToken() {
    return this._http.get<{ success: boolean; request_token?: string }>(
      this.BASE_URL + 'authentication/token/new'
    );
  }

  private validateToken(username: string, password: string, authToken: string) {
    return this._http.post<{ success: boolean }>(
      this.BASE_URL + 'authentication/token/validate_with_login',
      {
        username: username,
        password: password,
        request_token: authToken,
      }
    );
  }

  private getSessionId(validatedToken: string) {
    return this._http.post<{ success: boolean; session_id: string }>(
      this.BASE_URL + 'authentication/session/new',
      { request_token: validatedToken }
    );
  }

  login(username: string, password: string) {
    return new Observable<{ success: boolean; sessionId?: string }>(
      (subscriber) => {
        this.getAuthToken().subscribe((authResponse) => {
          if (authResponse.success) {
            this.validateToken(
              username,
              password,
              authResponse.request_token!
            ).subscribe({
              next: (validationResponse) => {
                if (validationResponse.success) {
                  this.getSessionId(authResponse.request_token!).subscribe(
                    (sessionResponse) => {
                      if (sessionResponse.success) {
                        subscriber.next({
                          success: true,
                          sessionId: sessionResponse.session_id,
                        });
                      } else
                        throw new Error('Server session id request failed');
                    }
                  );
                } else {
                  subscriber.next({ success: false });
                }
              },
              error: (err) => {
                subscriber.next({ success: false });
              },
            });
          } else throw new Error('Server auth token request failed');
        });
      }
    );
  }

  logout(validSessionId: string) {
    return this._http.delete(this.BASE_URL + 'authentication/session', {
      body: { session_id: validSessionId },
    });
  }
}
