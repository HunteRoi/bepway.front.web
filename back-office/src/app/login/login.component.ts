import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageAccessor } from '../services/StorageAccessor';

import { BepwayService } from '../services/bepway.service';
import { LoginModel, User } from '../model/old/Models';

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
  public errorHandler: {};

  constructor(private fb: FormBuilder, private router: Router, private myApi: BepwayService) {}

  ngOnInit(): void {
    this.errorHandler = this.HIDDEN;
    if (StorageAccessor.deserializeStorage(this.TOKEN_KEY)) {
      this.router.navigateByUrl("/home");
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.loginUser = this.loginForm.value;

      this.myApi.getToken(this.loginUser).subscribe(
        result => {
          this.errorHandler = this.HIDDEN;
          StorageAccessor.serializeStorage(this.TOKEN_KEY, result);
          this.myApi.getUser(this.loginUser.login).subscribe(
            result => {
              StorageAccessor.serializeStorage(this.USER_KEY, result);
              this.router.navigateByUrl("/home");
            },
            error => this.errorHandler = this.VISIBLE
          );
        },
        error => this.errorHandler = this.VISIBLE
      );
    }
  }
}
