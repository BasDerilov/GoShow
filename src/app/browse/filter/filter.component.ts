import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Genre } from './genre.mode';
import { GetFiltersService } from './get-filters.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  genres?: Genre[];

  filterForm = this.formBuilder.group({
    genre: [],
  });

  constructor(
    private filterService: GetFiltersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterService.getGenres().subscribe((response) => {
      this.genres = response.genres;
    });
  }

  onSubmit() {
    console.warn(this.filterForm.value);
  }
}
