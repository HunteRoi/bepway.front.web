import { Component, OnInit } from '@angular/core';
import { TabsService } from '../tabs.service';

@Component({
  selector: 'app-road-management',
  templateUrl: './road-management.component.html',
  styleUrls: ['./road-management.component.css']
})
export class RoadManagementComponent implements OnInit {

  tabsService : TabsService;

  constructor() { 
    this.tabsService = new TabsService("roadTab");
  }

  ngOnInit() {
    this.tabsService.setActive();
  }

}
