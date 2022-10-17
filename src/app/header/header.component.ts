import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { LocalService } from '../shared/local.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuBtnSvg = faBars;
  currentUser?: User;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.userSubj.subscribe((user) => {
      this.currentUser = user;
    });
  }

  onLogout() {
    this._userService.logOutUser();
  }
}
