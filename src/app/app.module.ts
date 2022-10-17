import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { DetailsComponent } from './browse/details/details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './home/search/search.component';
import { SuggestedComponent } from './home/suggested/suggested.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ApiTokenInterceptor } from './interceptors/api-token-interceptor';
import { UserComponent } from './user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieCardComponent } from './browse/movie-card/movie-card.component';
import { FilterComponent } from './browse/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BrowseComponent,
    DetailsComponent,
    SearchComponent,
    SuggestedComponent,
    LoginComponent,
    UserComponent,
    PageNotFoundComponent,
    MovieCardComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
