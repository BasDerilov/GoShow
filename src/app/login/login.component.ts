import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentialsValid = true;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  constructor(
    private _login: LoginService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._login.credentialsValid.subscribe((validity) => {
      this.credentialsValid = validity;
    });
  }

  onLogin(loginForm: FormGroup) {
    const username = loginForm.get('username')?.value;
    const password = loginForm.get('password')?.value;

    this._login.login(username, password).subscribe((loginResult) => {
      if (loginResult.success) {
        this.credentialsValid = true;

        this._userService.userSubj.next({
          username: username,
          sessionId: loginResult.sessionId!,
        });

        this._router.navigate(['home']);
      } else {
        this.credentialsValid = false;
      }
    });
  }

  onRegister() {
    window.open('https://www.themoviedb.org/signup');
  }

  onForgotPassword() {
    window.open('https://www.themoviedb.org/reset-password');
  }
}