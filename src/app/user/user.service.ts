import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubj = new Subject<User>();
  isLoggedIn = false;

  private _user?: User;

  constructor() {
    this.userSubj.subscribe((newUser) => {
      this._user = newUser;
      this.isLoggedIn = true;
    });
  }
}
