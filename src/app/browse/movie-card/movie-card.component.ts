import { Component, Input, OnInit } from '@angular/core';
import { GetMediaService } from 'src/app/shared/get-media.service';
import { Movie } from 'src/app/shared/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie?: Movie;
  imagePath?: string;

  constructor(private _mediaService: GetMediaService) {}

  ngOnInit(): void {}

  getImage() {
    return (this.imagePath = this._mediaService.getBackdrop(
      this.movie!.poster_path!
    ));
  }
}
