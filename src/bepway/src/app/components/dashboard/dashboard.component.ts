import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccess } from '../data-access';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public nowDate: Date;

  constructor(private router: Router) {
    this.nowDate = new Date();
  }

  ngOnInit() {
  }

  swapTab(tab : String){
    switch(tab){
      case 'homeTab' : 
        this.router.navigateByUrl("/home");
        break;
      case 'usersTab' : 
        this.router.navigateByUrl("/users");
        break;
      case 'companiesTab' : 
        this.router.navigateByUrl("/companies");
        break;
    }
  }

  onLogoff() {
    if (DataAccess.hasData()) {
      DataAccess.clearStorage();
      this.router.navigateByUrl("/login");
    }
  }
}
