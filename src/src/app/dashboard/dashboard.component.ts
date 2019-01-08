import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageAccessor } from '../services/StorageAccessor';
import { BepwayService } from '../services/bepway.service';
import { User } from '../model/classes/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Observable<User>;
  currentUser: User;
  nowDate: Date;

  constructor(private router: Router, private myApi: BepwayService) { 
    this.nowDate = new Date();
  }

  ngOnInit() {
    if (StorageAccessor.Exists(StorageAccessor.TOKEN_KEY) && StorageAccessor.Exists(StorageAccessor.USER_KEY)) {
      this.user = this.myApi.getUserByLogin(StorageAccessor.deserializeStorage<string>(StorageAccessor.USER_KEY));
      
      this.user.subscribe(
        (result: User) => {
          if (result) {
            this.currentUser = result;
          }
        },
        error => {
          console.log(error)
          this.router.navigateByUrl("login");
        });
    } else this.router.navigateByUrl('/login');
  }

  swapTab(tab : String){
    switch(tab){
      case 'homeTab' : 
        this.router.navigateByUrl("/home");
        break;
      case 'userTab' : 
        this.router.navigateByUrl("/user-management");
        break;
      case 'companyTab' : 
        this.router.navigateByUrl("/company-management");
        break;
    }
  }

  onLogoff() {
    if (StorageAccessor.clearStorage()) this.router.navigateByUrl("/login");
  }
}
