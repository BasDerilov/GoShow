import { User } from 'src/app/user/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMediaService } from 'src/app/shared/get-media.service';
import { Movie } from 'src/app/shared/models/movie.model';
import { ApiPaths } from 'src/environments/environment';
import { DetailsService } from '../details.service';
import { faDollarSign, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Credit } from 'src/app/shared/models/crdit.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  profilePicMissingIcon = faXmark;

  movie?: Movie;
  cast?: Credit[];
  user?: User;

  private readonly missingImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/7/75/Missing.png';

  constructor(
    private _detailsService: DetailsService,
    private _mediaService: GetMediaService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._detailsService.endpoint = ApiPaths.Movie;

    this._route.params.subscribe((params) => {
      const movieUrl = `${environment.baseUrl}${ApiPaths.Movie}/${params['id']}`;

      this._http.get<Movie>(movieUrl).subscribe((movie) => {
        this.movie = movie;
      });

      this._http
        .get<{ cast: Credit[] }>(`${movieUrl}/credits`)
        .subscribe((credits) => {
          this.cast = credits.cast;
        });
    });

    this._userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  get backdropPath() {
    if (this.movie?.backdrop_path) {
      return this._mediaService.getBackdrop(this.movie.backdrop_path);
    } else return this.missingImageUrl;
  }

  public asDate(dateString: string): Date {
    return new Date(Date.parse(dateString));
  }

  get posterPath() {
    if (this.movie?.poster_path) {
      return this._mediaService.getBackdrop(this.movie.poster_path);
    } else return this.missingImageUrl;
  }

  getMemberProfilePic(path: string | undefined) {
    return path ? this._mediaService.getProfilePic(path) : undefined;
  }
}
