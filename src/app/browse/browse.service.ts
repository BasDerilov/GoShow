import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.model';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<{
      page: number;
      results: Movie[];
      total_results: number;
      total_pages: number;
    }>('https://api.themoviedb.org/3/discover/movie');
  }
}
