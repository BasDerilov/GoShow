import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class GetMediaService {
  URL = 'https://api.themoviedb.org/3/';
  configuration?: Configuration;

  constructor(private _http: HttpClient, private _local: LocalService) {
    const config = _local.getData<Configuration>('image-configuration');

    if (config) {
      this.configuration = config;
    } else {
      console.log('Fetching configuration');

      this.getConfiguration().subscribe((config) => {
        this.configuration = config;
        _local.saveData('image-configuration', config);
      });
    }
  }

  private getConfiguration() {
    return this._http.get<Configuration>(this.URL + 'configuration');
  }

  getPoster(url: string, size?: number) {
    if (!size) {
      size = this.configuration!.images.poster_sizes.length - 1;
    }

    return this.getMedia(url, this.configuration!.images.poster_sizes[size]);
  }

  getBackdrop(url: string, size?: number) {
    if (!size) {
      size = this.configuration!.images.backdrop_sizes.length - 1;
    }

    return this.getMedia(url, this.configuration!.images.backdrop_sizes[size]);
  }

  private getMedia(url: string, size: string) {
    if (this.configuration) {
      return this.configuration.images.base_url + size + url;
    }
    throw new Error('Config file hasnt loaded');
  }
}

interface Configuration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: [string];
    logo_sizes: [string];
    poster_sizes: [string];
    profile_sizes: [string];
    strill_sizes: [string];
  };
  change_keys: [string];
}
