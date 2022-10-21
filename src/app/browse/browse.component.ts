import { Movie } from './../shared/models/movie.model';
import { BrowseService } from './browse.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { TvShow } from '../shared/models/tvShow.model';
import { ApiPaths } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  movies?: Movie[];
  tvShows?: TvShow[];
  filterIcon = faFilter;
  isMovies = true;
  pages?: number;
  page?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private browse: BrowseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const path = params['type'];
      const page = params['page'] as number;
      const pageRequestParams = new HttpParams({ fromObject: { page: page } });

      if (path === 'movies') {
        this.isMovies = true;
        this.browse.load(ApiPaths.Movie, pageRequestParams);
      } else if (path === 'tv') {
        this.isMovies = false;
        this.browse.load(ApiPaths.Tv, pageRequestParams);
      } else {
        this.router.navigate(['page-not-found']);
      }

      this.browse.page.subscribe((page) => {
        if (path === 'movies') {
          this.movies = page.results as Movie[];
        } else if (path === 'tv') {
          this.tvShows = page.results as TvShow[];
        }
        this.pages = page.total_pages;
      });
      this.page = page as number;
      console.log(typeof this.page);
    });
  }

  onPageChange(page: PageChangedEvent) {
    this.router.navigate([`../${+page.page}`], { relativeTo: this.route });
    this.page = +page.page;
  }
}
