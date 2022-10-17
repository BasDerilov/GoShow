import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from './genre.mode';

@Injectable({
  providedIn: 'root',
})
export class GetFiltersService {
  constructor(private http: HttpClient) {}

  getGenres() {
    const params = new HttpParams({ fromObject: { language: 'en-US' } });
    return this.http.get<{ genres: Genre[] }>(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        params: params,
      }
    );
  }
}
