import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageAccessor } from '../services/StorageAccessor';

import { BepwayService } from '../services/bepway.service';
import { LoginModel, User, Token } from '../model/classes/Models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  readonly TOKEN_KEY = "token";
  readonly USER_KEY = "currentUser";
  readonly HIDDEN = { "hidden": true };
  readonly VISIBLE = { "hidden": false };

  private loginUser: LoginModel;
  public loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  public loginErrorHandler: {};
  public unknownErrorHandler: {};

  constructor(private fb: FormBuilder, private router: Router, private myApi: BepwayService) {}

  ngOnInit(): void {
    this.errorsHandler(false, false);

    let token = StorageAccessor.deserializeStorage<Token>(this.TOKEN_KEY);
    if (token && token instanceof Token) {
      this.router.navigateByUrl("/home");
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.loginUser = this.loginForm.value;
      this.myApi.getToken(this.loginUser).subscribe(
        result => {
          if (result && result['access_token']) this.registerTokenAndUser(result as Token);
          else this.displayLoginError();
        }
      );
    }
  }

  private registerTokenAndUser(result: Token) {
    StorageAccessor.serializeStorage<Token>(this.TOKEN_KEY, result);
    this.myApi.getUser(this.loginUser.login).subscribe(
      result => {
        if (result instanceof User) {
          StorageAccessor.serializeStorage<User>(this.USER_KEY, result);
        } else this.displayUnknownError();
      }
    );
  }

  // error handling
  private displayLoginError() {
    this.errorsHandler(true);
  }

  private displayUnknownError() {
    this.errorsHandler(undefined, true);
  }

  private errorsHandler(login = false, unknown = false) {
    this.loginErrorHandler = this.HIDDEN;
    this.unknownErrorHandler = this.HIDDEN;
    
    if (login) this.loginErrorHandler = this.VISIBLE;
    if (unknown) this.unknownErrorHandler = this.VISIBLE;
  }
}
