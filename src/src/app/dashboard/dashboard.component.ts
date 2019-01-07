import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageAccessor } from '../services/StorageAccessor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
