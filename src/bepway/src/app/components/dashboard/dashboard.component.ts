import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccess } from '../../modules/data-access';

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
    if (!DataAccess.isAuthenticated()) this.router.navigateByUrl("/login");
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
    if (DataAccess.hasData()) {
      DataAccess.clearStorage();
      this.router.navigateByUrl("/login");
    }
  }
}
