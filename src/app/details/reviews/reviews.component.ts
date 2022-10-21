import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { GetMediaService } from 'src/app/shared/get-media.service';
import { Review } from 'src/app/shared/models/review.model';
import { ApiPaths, environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() id?: number;
  @Input() mediaType?: string;
  reviews?: Review[];
  private _endpoint?: string;

  constructor(
    private _http: HttpClient,
    private _mediaService: GetMediaService
  ) {}

  ngOnInit(): void {
    if (this.mediaType === 'movie') {
      this._endpoint = `${ApiPaths.Movie}/${this.id}/reviews`;
    } else if (this.mediaType === 'tv') {
      this._endpoint = `${ApiPaths.Tv}/${this.id}/reviews`;
    } else {
      throw new Error('media type wasnt defined properly');
    }

    this._http
      .get<{ results: Review[] }>(`${environment.baseUrl}${this._endpoint}`)
      .subscribe((response) => {
        this.reviews = response.results;
        console.log(this.reviews);
      });
  }

  getAvatar(url: string) {
    if (url.startsWith('/http')) {
      const properUrl = url.slice(1);
      return properUrl;
    }

    return this._mediaService.getPoster(url);
  }
}
