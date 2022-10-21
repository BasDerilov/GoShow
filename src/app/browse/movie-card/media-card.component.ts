import { TvShow } from '../../shared/models/tvShow.model';
import { Component, Input, OnInit } from '@angular/core';
import { GetMediaService } from 'src/app/shared/get-media.service';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MediaCardComponent implements OnInit {
  @Input() isMovie?: boolean;
  @Input() media?: Movie | TvShow;

  imagePath?: string;

  constructor(private _mediaService: GetMediaService) {}

  ngOnInit(): void {}

  getImage() {
    return (this.imagePath = this._mediaService.getPoster(
      this.media!.poster_path!
    ));
  }
}
