import { Movie } from './../shared/movie.model';
import { BrowseService } from './browse.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  movies?: Movie[];
  filterIcon = faFilter;

  constructor(private route: ActivatedRoute, private browse: BrowseService) {}

  ngOnInit(): void {
    this.browse.page.subscribe((page) => {
      this.movies = page.results;
    });
  }
}
