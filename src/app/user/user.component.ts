import { ApiPaths } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account } from './../shared/models/account.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { TvShow } from '../shared/models/tvShow.model';
import { Movie } from '../shared/models/movie.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  account?: Account;
  favoriteTvShows?: TvShow[];
  favoriteMovies?: Movie[];

  ratedMovies?: Movie[];
  ratedTvShows?: TvShow[];

  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit(): void {
    this._userService.user.subscribe((user) => {
      if (user) {
        this._http
          .get<Account>(`${environment.baseUrl}${ApiPaths.Account}`)
          .subscribe((details) => {
            this.account = details;
          });
      }
    });
  }

  onLoadFavorites() {
    this._http
      .get<{ results: Movie[] }>(
        `${environment.baseUrl}${ApiPaths.Account}/${this.account?.id}/favorite/movies`
      )
      .subscribe((resp) => {
        this.favoriteMovies = resp.results;
      });

    this._http
      .get<{ results: TvShow[] }>(
        `${environment.baseUrl}${ApiPaths.Account}/${this.account?.id}/favorite/tv`
      )
      .subscribe((resp) => {
        this.favoriteTvShows = resp.results;
      });
  }

  onLoadRated() {
    this._userService.getUserReviews();

    this._userService.ratedMovies.subscribe((ratedMovies) => {
      this.ratedMovies = ratedMovies;
    });

    this._userService.ratedTvShows.subscribe((ratedTvShows) => {
      this.ratedTvShows = ratedTvShows;
    });
  }
}
