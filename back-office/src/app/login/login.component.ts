import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../css/main.css']
})

export class LoginComponent implements OnInit {
  readonly KEY = 'currentUser';
  readonly VALID_USERS: User[];
  readonly PASSWORD = '123';

  currentUser: User;
  title = 'back-office';
  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) {
    this.VALID_USERS = [
      new User('hunteroi', 'hunteroi@bep.be'),
      new User('imnoot', 'imnoot@bep.be')
    ];
  }

  ngOnInit(): void {}

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const formUser = this.loginForm.value;
      const newUser = this.VALID_USERS.find(u => u.login === formUser.login && formUser.password === this.PASSWORD) || null;
      console.log(newUser);
      this.currentUser = this.deserialize(this.KEY);
      if (newUser !== null || newUser !== null && this.currentUser !== newUser) {
        this.currentUser = newUser;
        console.log(this.currentUser);
        this.serialize(this.KEY, this.currentUser);
        // this.loginForm.reset();
        this.router.navigateByUrl('/home');
      } else {
        // wrong input - show message
      }
    }
  }

  private deserialize(key: string): User {
    return JSON.parse(localStorage.getItem(key));
  }

  private serialize(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
