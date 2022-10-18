import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../shared/movie.model';
import { ApiPaths } from 'src/environments/environment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  page = new BehaviorSubject<Page>({});

  constructor(private http: HttpClient) {
    this.load();
  }

  load(params?: HttpParams) {
    this.http
      .get<Page>(
        `${environment.baseUrl}${ApiPaths.Discover}${ApiPaths.Movie}`,
        {
          params: params,
        }
      )
      .subscribe((pageResp) => {
        this.page.next(pageResp);
      });
  }
}

interface Page {
  page?: number;
  results?: Movie[];
  total_results?: number;
  total_pages?: number;
}
