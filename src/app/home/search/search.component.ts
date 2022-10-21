import { TvShow } from 'src/app/shared/models/tvShow.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BrowseService } from 'src/app/browse/browse.service';
import { ApiPaths, environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchIcon = faMagnifyingGlass;
  results?: Movie[] | TvShow[];
  selectedMedia?: string;

  search = new FormGroup({
    query: new FormControl(undefined),
    mediaType: new FormControl('movie', Validators.required),
  });

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  onSearch(form: FormGroup) {
    const query: string | undefined = form.get('query')?.value;
    const mediaType: string = form.get('mediaType')!.value;

    const queryParams = new HttpParams({
      fromObject: { query: query ? query : '' },
    });

    if (mediaType === 'movie') {
      this.selectedMedia = 'movie';
      this._http
        .get<{ results: Movie[] }>(
          `${environment.baseUrl}${ApiPaths.Search}${ApiPaths.Movie}`,
          { params: queryParams }
        )
        .subscribe((response) => {
          this.results = response.results;
        });
    } else if (mediaType === 'tv') {
      this.selectedMedia = 'tv';
      this._http
        .get<{ results: TvShow[] }>(
          `${environment.baseUrl}${ApiPaths.Search}${ApiPaths.Tv}`,
          { params: queryParams }
        )
        .subscribe((response) => {
          this.results = response.results;
        });
    }
  }
}
