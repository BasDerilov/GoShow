// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://api.themoviedb.org/3',
};

export enum ApiPaths {
  Account = '/account',
  Auth = '/authentication',
  Certification = '/certification',
  Collection = '/collection',
  Companies = '/company',
  Configuration = '/configuration',
  Credit = '/credit',
  Discover = '/discover',
  Find = '/find',
  Genre = '/genre',
  Keyword = '/keyword',
  List = '/list',
  Movie = '/movie',
  Network = '/network',
  Trending = '/trending',
  People = '/person',
  Reviews = '/review',
  Search = '/search',
  Tv = '/tv',
  Watch = '/watch',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
