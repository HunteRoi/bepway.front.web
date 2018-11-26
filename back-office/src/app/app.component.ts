import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './css/main.css']
})
export class AppComponent implements OnInit {
  readonly KEY = 'currentUser';
  currentUser: User;
  title = 'back-office';
  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    /*if (this.loginForm.valid) {
      const newUser = newUser(); //API call to DB to get user based on provided login and password

      this.currentUser = this.deserialize(this.KEY);
      if (this.currentUser === null || this.currentUser !== newUser) {
        this.currentUser = newUser;
      }
      this.serialize(this.KEY, newUser);
      this.loginForm.reset();
    }*/
  }

  private deserialize(key: string): User {
    return JSON.parse(localStorage.getItem(key));
  }

  private serialize(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
