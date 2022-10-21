import { TvShow } from 'src/app/shared/models/tvShow.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { Account } from './../../shared/models/account.model';
import { ApiPaths } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-rate-favorite',
  templateUrl: './rate-favorite.component.html',
  styleUrls: ['./rate-favorite.component.scss'],
})
export class RateFavoriteComponent implements OnInit {
  accountId?: number;
  @Input() media?: Movie | TvShow;
  @Input() mediaType?: string;
  isValid = false;

  userRating?: number;
  isFavorite?: boolean;

  startIcon = faStar;

  rateForm = new FormGroup({
    rating: new FormControl(null, [
      Validators.required,
      Validators.max(10),
      Validators.min(1),
    ]),
  });

  constructor(private _http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserReviews();

    this._http
      .get<Account>(`${environment.baseUrl}${ApiPaths.Account}`)
      .subscribe((accResp) => {
        this.accountId = accResp?.id;
      });

    if (this.mediaType === 'movie') {
      this.userService.ratedMovies.subscribe((movieList) => {
        console.log(movieList);
        if (movieList) {
          const match = movieList.find((movie) => movie.id === this.media!.id);

          console.log(this.userRating);
          if (match) {
            this.userRating = match.rating;
          }
        }
      });
    } else if (this.mediaType === 'tv') {
      this.userService.ratedTvShows.subscribe((tvList) => {
        console.log(tvList);
        if (tvList) {
          const match = tvList.find((tv) => tv.id === this.media!.id);

          console.log(this.userRating);
          if (match) {
            this.userRating = match.rating;
          }
        }
      });
    }
  }

  onSubmit(form: FormGroup) {
    this._http
      .post(
        `${environment.baseUrl}/${this.mediaType}/${this.media!.id}/rating`,
        { value: form.get('rating')?.value }
      )
      .subscribe(() => {
        this.userRating = form.get('rating')?.value;
      });
  }

  onDeleteRating() {
    this._http
      .delete(
        `${environment.baseUrl}/${this.mediaType}/${this.media?.id}/rating`
      )
      .subscribe(() => {
        this.userRating = undefined;
      });
  }

  onAddToFavorites() {}
}
