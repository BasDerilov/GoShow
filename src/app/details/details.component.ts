import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../shared/models/person.model';
import { Movie } from '../shared/models/movie.model';
import { DetailsService } from './details.service';
import { TvShow } from '../shared/models/tvShow.model';
import { ApiPaths } from 'src/environments/environment';
import { GetMediaService } from '../shared/get-media.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private _resource?: Movie | TvShow | Person;
  resourceEndpoint?: string;
  type?: number;

  constructor(
    private _detailsService: DetailsService,
    private _route: ActivatedRoute,
    private _mediaService: GetMediaService
  ) {}

  ngOnInit(): void {}
}
