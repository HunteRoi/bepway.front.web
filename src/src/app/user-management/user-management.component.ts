import { Component, OnInit } from '@angular/core';
import { TabsService } from '../services/tab.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  tabsService : TabsService;

  constructor() {
    this.tabsService = new TabsService("userTab");
   }

  ngOnInit() {
    this.tabsService.setActive();
  }

}
