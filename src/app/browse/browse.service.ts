import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../shared/models/movie.model';
import { ApiPaths } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { TvShow } from '../shared/models/tvShow.model';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  page = new BehaviorSubject<Page>({});

  constructor(private http: HttpClient) {}

  load(type: ApiPaths, params?: HttpParams) {
    this.http
      .get<Page>(`${environment.baseUrl}${ApiPaths.Discover}${type}`, {
        params: params,
      })
      .subscribe((pageResp) => {
        this.page.next(pageResp);
      });
  }

  loadQuery(type: ApiPaths, params?: HttpParams) {
    this.http
      .get<Page>(`${environment.baseUrl}${ApiPaths.Search}${type}`, {
        params: params,
      })
      .subscribe((pageResp) => {
        this.page.next(pageResp);
      });
  }
}

interface Page {
  page?: number;
  results?: Movie[] | TvShow[];
  total_results?: number;
  total_pages?: number;
}
