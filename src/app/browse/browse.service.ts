import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(private http: HttpClient) {}

  load() {
    this.http
      .get('https://api.themoviedb.org/3/discover/movie')
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
