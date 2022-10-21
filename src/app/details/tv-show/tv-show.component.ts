import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GetMediaService } from 'src/app/shared/get-media.service';
import { Credit, CreditCast } from 'src/app/shared/models/crdit.model';
import { TvShow } from 'src/app/shared/models/tvShow.model';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { ApiPaths, environment } from 'src/environments/environment';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss'],
})
export class TvShowComponent implements OnInit {
  profilePicMissingIcon = faXmark;

  tvShow?: TvShow;
  cast?: Credit[];

  user?: User;

  private readonly missingImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/7/75/Missing.png';

  constructor(
    private _detailsService: DetailsService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _mediaService: GetMediaService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._detailsService.endpoint = ApiPaths.Tv;

    this._route.params.subscribe((params) => {
      const tvShowUrl = `${environment.baseUrl}${ApiPaths.Tv}/${params['id']}`;

      this._http.get<TvShow>(tvShowUrl).subscribe((show) => {
        this.tvShow = show;
      });

      this._http
        .get<{ cast: CreditCast[] }>(`${tvShowUrl}/credits`)
        .subscribe((credits) => {
          this.cast = credits.cast;
        });
    });

    this._userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  get backdropPath() {
    if (this.tvShow?.backdrop_path) {
      return this._mediaService.getBackdrop(this.tvShow.backdrop_path);
    } else return this.missingImageUrl;
  }

  getProfile(url: string) {
    return this._mediaService.getProfilePic(url);
  }

  public asDate(dateString: string): Date {
    return new Date(Date.parse(dateString));
  }
}
