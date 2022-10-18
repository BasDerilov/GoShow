import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Actor } from 'src/app/shared/actor.model';
import { BrowseService } from '../browse.service';
import { Genre } from './genre.mode';
import { GetFiltersService } from './get-filters.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() isColapsed = false;

  genres: Genre[] = [];
  actors: Actor[] = [];
  yearRange: number[] = [];
  ratingRange = Array.from<number, number>({ length: 10 }, (v, k) => k + 1);

  private _minYear?: number;
  private _maxYear?: number;

  filterForm = this.formBuilder.group({
    selectedGenres: this.formBuilder.array<Genre>([]),
    yearRangeStart: null,
    yearRangeEnd: null,
    ratingRangeStart: null,
    ratingRangeEnd: null,
    selectedActors: this.formBuilder.array<Actor>([]),
  });

  constructor(
    private filterService: GetFiltersService,
    private formBuilder: FormBuilder,
    private browseService: BrowseService
  ) {}

  ngOnInit(): void {
    this.filterService.getGenres().subscribe((response) => {
      this.genres = response.genres;
    });

    this._getValidYears();
  }

  get actorsNames() {
    return this.actors.map((actor) => actor.name);
  }

  get selectedGenres() {
    return this.filterForm.get('selectedGenres') as FormArray;
  }

  get selectedActors() {
    return this.filterForm.get('selectedActors') as FormArray;
  }

  private _getValidYears() {
    this.filterService
      .getYearRange()[0]
      .subscribe((min) => {
        if (min !== undefined) {
          this._minYear = parseInt(min.split('-', 1)[0]);
        }
      })
      .add(() => {
        this.filterService
          .getYearRange()[1]
          .subscribe((max) => {
            if (max !== undefined) {
              this._maxYear = parseInt(max.split('-', 1)[0]);
            }
          })
          .add(() => {
            this.yearRange = Array.from<number, number>(
              {
                length: this._maxYear! - this._minYear! + 1,
              },
              (v, k) => this._minYear! + k
            ).reverse();
          });
      });
  }

  addToGenres(genre: Genre) {
    if (
      !this.selectedGenres.controls.some((control) => control.value === genre)
    ) {
      this.selectedGenres.push(this.formBuilder.control(genre));
    }
  }

  removeFromGenres(genre: Genre) {
    const index = this.selectedGenres.controls.findIndex(
      (control) => control.value === genre
    );

    this.selectedGenres.removeAt(index);
  }

  onChangeSearch(keyword: string) {
    if (keyword.length >= 1) {
      this.filterService.getActorsByKeyword(keyword).subscribe((results) => {
        this.actors = Array.from(
          results.results.map((actor) => {
            return { name: actor.name, id: actor.id };
          })
        );
      });
    } else {
      this.actors = [];
    }
  }

  onAddActor(actorName: string) {
    const actor = this.actors.find((curActor) => curActor.name === actorName);
    if (
      !this.selectedActors.controls.some((curActor) => curActor.value === actor)
    ) {
      this.selectedActors.push(this.formBuilder.control(actor));
    }
  }

  removeFromActors(actor: Actor) {
    const index = this.selectedActors.controls.findIndex(
      (control) => control.value === actor
    );

    this.selectedActors.removeAt(index);
  }

  onSubmit(form: FormGroup) {
    let params = new HttpParams();

    Object.keys(form.controls).forEach((key) => {
      const value = form.get(key)!.value;

      if (value !== null) {
        switch (key) {
          case 'selectedGenres':
            params = params.append('with_genres', this._concatIds(value));
            break;

          case 'yearRangeStart':
            params = params.append('release_date.gte', value);
            break;

          case 'yearRangeEnd':
            params = params.append('release_date.lte', value);
            break;

          case 'ratingRangeStart':
            params = params.append('vote_average.gte', value);
            break;

          case 'ratingRangeEnd':
            params = params.append('vote_average.lte', value);
            break;

          case 'selectedActors':
            params = params.append('with_cast', this._concatIds(value));
            break;

          default:
            break;
        }
      }
    });

    this.browseService.load(params);
    console.log(this.filterForm.value);
  }

  private _concatIds(filtersArr: Genre[] | Actor[]) {
    return filtersArr.map((value) => value.id).toString();
  }
}
