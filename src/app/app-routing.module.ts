import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoggedInGuardService } from './shared/logged-in-guard.service';
import { UserComponent } from './user/user.component';
import { PersonComponent } from './details/person/person.component';
import { TvShowComponent } from './details/tv-show/tv-show.component';
import { MovieComponent } from './details/movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'user/:username',
    component: UserComponent,
    canActivate: [LoggedInGuardService],
    pathMatch: 'prefix',
  },
  {
    path: 'browse/:type/:page',
    component: BrowseComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
    children: [
      { path: 'movie/:id', component: MovieComponent },
      { path: 'tv/:id', component: TvShowComponent },
      { path: 'person/:id', component: PersonComponent },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
