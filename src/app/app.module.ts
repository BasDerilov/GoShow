import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { DetailsComponent } from './details/details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './home/search/search.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ApiTokenInterceptor } from './interceptors/api-token-interceptor';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MediaCardComponent } from './browse/movie-card/media-card.component';
import { FilterComponent } from './browse/filter/filter.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PersonComponent } from './details/person/person.component';
import { MovieComponent } from './details/movie/movie.component';
import { TvShowComponent } from './details/tv-show/tv-show.component';
import { ReviewsComponent } from './details/reviews/reviews.component';
import { FormsModule } from '@angular/forms';
import { RateFavoriteComponent } from './details/rate-favorite/rate-favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BrowseComponent,
    DetailsComponent,
    SearchComponent,
    LoginComponent,
    UserComponent,
    PageNotFoundComponent,
    MediaCardComponent,
    FilterComponent,
    PersonComponent,
    MovieComponent,
    TvShowComponent,
    ReviewsComponent,
    RateFavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    AutocompleteLibModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
