import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  username: string | undefined;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.userSubj.subscribe((user) => {
      if (user) {
        this.username = user.username;
      }
    });
  }
}
