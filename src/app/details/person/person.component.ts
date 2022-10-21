import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { GetMediaService } from 'src/app/shared/get-media.service';
import { CreditCast, CreditCrew } from 'src/app/shared/models/crdit.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { Person } from 'src/app/shared/models/person.model';
import { ApiPaths, environment } from 'src/environments/environment';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  person?: Person;
  genders = ['???', 'Female', 'Male', '???'];
  creditsAsCrew?: CreditCrew[];
  creditsAsCast?: CreditCast[];
  missinImageIcon = faQuestion;

  constructor(
    private _detailsService: DetailsService,
    private _mediaService: GetMediaService,
    private _http: HttpClient,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._detailsService.endpoint = ApiPaths.Movie;

    this._route.params.subscribe((params) => {
      const personUrl = `${environment.baseUrl}${ApiPaths.People}/${params['id']}`;

      this._http.get<Person>(personUrl).subscribe((person) => {
        this.person = person;

        this._http
          .get<{ cast: CreditCast[]; crew: CreditCrew[] }>(
            `${personUrl}/combined_credits`
          )
          .pipe(
            map((credits) => {
              const unique = credits.crew.reduce((current, previous) => {
                if (
                  !current.some((credit) => {
                    return credit.id === previous.id;
                  })
                )
                  current.push(previous);
                return current;
              }, <CreditCrew[]>[]);

              credits.crew = unique;
              return credits;
            })
          )
          .subscribe((credits) => {
            this.creditsAsCrew = credits.crew;
            this.creditsAsCast = credits.cast;
          });
      });
    });
  }

  public asDate(dateString: string): Date {
    return new Date(Date.parse(dateString));
  }

  public get profilePic(): string {
    return this._mediaService.getProfilePic(this.person!.profile_path!);
  }

  filterUglyCreds(credits: CreditCrew[]) {
    return credits.filter((cred) => cred.poster_path && cred.title);
  }

  public getPoster(url: string): string {
    return this._mediaService.getPoster(url);
  }
}
