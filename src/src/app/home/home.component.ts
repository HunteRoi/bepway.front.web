import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TabsService } from '../services/tab.service';
import { StorageAccessor } from '../services/StorageAccessor';
import { User } from '../model/classes/Models';
import { BepwayService } from '../services/bepway.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabsService : TabsService;
  user: Observable<User>;
  currentUser: User;

  constructor(private router: Router, private myApi: BepwayService) {
    this.tabsService = new TabsService("homeTab");
   }

  ngOnInit() {
    if (StorageAccessor.Exists(StorageAccessor.TOKEN_KEY) && StorageAccessor.Exists(StorageAccessor.USER_KEY)) {
      this.user = this.myApi.getUserByLogin(StorageAccessor.deserializeStorage<string>(StorageAccessor.USER_KEY));
      this.user.subscribe(
        (result: User) => {
          if (result) {
            this.currentUser = result;
            this.tabsService.setActive();
          }
        },
        error => {
          console.log(error)
          this.router.navigateByUrl("login");
        });
    } else this.router.navigateByUrl('/login');
  }
}
