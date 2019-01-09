import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel, Token } from '../../models/classes/Models';
import { DataAccess } from '../data-access';
import { TokenService } from 'src/app/services/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    login: [ '', Validators.required ],
    password: [ '', Validators.required ]
  });

  constructor(private router: Router, private fb: FormBuilder, private tokenDataAccess: TokenService) { }

  ngOnInit() { 
    if (DataAccess.isAuthenticated()) this.router.navigateByUrl("/home");
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      let loginUser: LoginModel = this.loginForm.value;

      this.tokenDataAccess.login(loginUser).subscribe(
        (result: Token) => {
          if (result && result['access_token']) {
            DataAccess.serializeStorage<Token>(DataAccess.TOKEN_KEY, result);
            DataAccess.serializeStorage<string>(DataAccess.USER_KEY, loginUser.login);
            this.router.navigateByUrl("/home");
          }
        },
        error => console.log(error)
      );
    }
  }
}
