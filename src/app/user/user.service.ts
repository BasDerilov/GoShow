import { Injectable } from '@angular/core';
import { BehaviorSubject, buffer, Subject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { LocalService } from '../shared/local.service';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubj = new BehaviorSubject<User | undefined>(undefined);
  isLoggedIn = false;

  private _user?: User;

  constructor(
    private _localService: LocalService,
    private _loginService: LoginService
  ) {
    if (_localService.getData<User>('user')) {
      const storageUser = _localService.getData<User>('user');

      this.userSubj.next(storageUser!);
      this.isLoggedIn = true;
    }

    this.userSubj.subscribe((user) => {
      this._user = user;
    });
  }

  logInUser(user: User, remember: boolean) {
    this.userSubj.next(user);

    if (remember) {
      this._localService.saveData<User>('user', user);
    }

    this.isLoggedIn = true;
  }

  logOutUser() {
    this._loginService.logout(this._user!.sessionId).subscribe(() => {});

    this.userSubj.next(undefined);
    this._localService.clearData();

    this.isLoggedIn = false;
  }
}
