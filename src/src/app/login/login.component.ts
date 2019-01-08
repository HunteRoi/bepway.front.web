import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageAccessor } from '../services/StorageAccessor';
import { BepwayService } from '../services/bepway.service';
import { LoginModel, Token } from '../model/classes/Models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  loginUser: LoginModel;

  constructor(private fb: FormBuilder, private router: Router, private myApi: BepwayService) {}

  ngOnInit(): void {
    let token = StorageAccessor.deserializeStorage<Token>(StorageAccessor.TOKEN_KEY);
    if (token && token['accessToken']) this.router.navigateByUrl("/home");
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.loginUser = this.loginForm.value;
      this.myApi.getToken(this.loginUser).subscribe(
        result => {
          if (result && result['access_token']) {
            StorageAccessor.serializeStorage<Token>(StorageAccessor.TOKEN_KEY, result);
            StorageAccessor.serializeStorage<string>(StorageAccessor.USER_KEY, this.loginUser.login);
            this.router.navigateByUrl("/home");
          }
        },
        //error => console.log(error)
      );
    }
  }
}
