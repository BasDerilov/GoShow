import { Account } from './../shared/models/account.model';
import { ApiPaths } from './../../environments/environment';
import { User } from 'src/app/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { LocalService } from '../shared/local.service';
import { Movie } from '../shared/models/movie.model';
import { TvShow } from '../shared/models/tvShow.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new BehaviorSubject<User | undefined>(undefined);
  ratedMovies = new BehaviorSubject<Movie[] | undefined>(undefined);
  ratedTvShows = new BehaviorSubject<TvShow[] | undefined>(undefined);
  isLoggedIn = false;

  private _user?: User;

  constructor(
    private _localService: LocalService,
    private _loginService: LoginService,
    private _http: HttpClient
  ) {
    if (_localService.getData<User>('user')) {
      const storageUser = _localService.getData<User>('user');

      this.user.next(storageUser!);
      this.isLoggedIn = true;
    }

    this.user.subscribe((session) => {
      this._user = session;
    });
  }

  logInUser(session: User, remember: boolean) {
    this.user.next(session);

    if (remember) {
      this._localService.saveData<User>('user', {
        username: session.username,
        sessionId: session.sessionId,
        account: session.account,
      });
    }

    this.isLoggedIn = true;
  }

  getUserReviews() {
    this._http
      .get<{ results: Movie[] }>(
        `${environment.baseUrl}${ApiPaths.Account}/${this._user?.account.id}/rated/movies`
      )
      .subscribe((resp) => {
        this.ratedMovies.next(resp.results);
        console.log(resp.results);
      });

    this._http
      .get<{ results: TvShow[] }>(
        `${environment.baseUrl}${ApiPaths.Account}/${this._user?.account.id}/rated/tv`
      )
      .subscribe((resp) => {
        this.ratedTvShows.next(resp.results);
        console.log(resp.results);
      });
  }

  logOutUser() {
    this._loginService.logout(this._user!.sessionId).subscribe(() => {});

    this.user.next(undefined);
    this._localService.clearData();

    this.isLoggedIn = false;
  }
}
