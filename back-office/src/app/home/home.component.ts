import { Component, OnInit } from '@angular/core';
import { TabsService } from '../services/tab.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabsService : TabsService;

  constructor() {
    this.tabsService = new TabsService("homeTab");
   }

  ngOnInit() {
    this.tabsService.setActive();
  }

}
