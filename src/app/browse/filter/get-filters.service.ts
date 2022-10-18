import { Movie } from 'src/app/shared/movie.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from './genre.mode';
import { ApiPaths } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Actor } from 'src/app/shared/actor.model';

@Injectable({
  providedIn: 'root',
})
export class GetFiltersService {
  constructor(private http: HttpClient) {}

  getGenres() {
    const url = `${environment.baseUrl}${ApiPaths.Genre}${ApiPaths.Movie}${ApiPaths.List}`;
    const params = new HttpParams({ fromObject: { language: 'en-US' } });
    return this.http.get<{ genres: Genre[] }>(url, {
      params: params,
    });
  }

  getYearRange() {
    const url = `${environment.baseUrl}${ApiPaths.Discover}/movie`;
    const paramsOldest = new HttpParams({
      fromObject: { sort_by: 'release_date.asc' },
    });
    const paramsNewest = new HttpParams({
      fromObject: { sort_by: 'release_date.desc' },
    });

    return [
      this.http.get<{ results: Movie[] }>(url, { params: paramsOldest }).pipe(
        map((resp) => {
          return resp.results[0].release_date;
        })
      ),
      this.http.get<{ results: Movie[] }>(url, { params: paramsNewest }).pipe(
        map((resp) => {
          return resp.results[0].release_date;
        })
      ),
    ];
  }

  getActorsByKeyword(keyword: string) {
    const url = `${environment.baseUrl}${ApiPaths.Search}${ApiPaths.People}`;
    const params = new HttpParams({ fromObject: { query: keyword } });
    return this.http.get<{ results: Actor[] }>(url, { params: params });
  }
}
