import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiPaths } from 'src/environments/environment';
import { GetMediaService } from '../shared/get-media.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private _suggestionsEndpSubject = new BehaviorSubject<string | undefined>(
    undefined
  );

  constructor(private _mediaService: GetMediaService) {}

  get endpointSubject() {
    return this._suggestionsEndpSubject;
  }

  set endpoint(endpoint: string) {
    this._suggestionsEndpSubject.next(`${ApiPaths.Discover}${endpoint}`);
  }
}
