import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { TabsService } from '../services/tab.service';
import { MatPaginator, MatSort } from '@angular/material';
import { UserDataTable } from '../services/user-data-table-datasource';
import { BepwayService } from '../services/bepway.service';
import { User } from '../model/classes/Models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserDataTable;
  tabsService : TabsService;
  selectedUser: User;
  selectedRowName = "";

  constructor(private myApi: BepwayService) {
    this.tabsService = new TabsService("userTab");
   }

  async ngOnInit() {
    this.tabsService.setActive();
  }

  selectCompany(row){
    this.selectedUser = row;
    this.selectedRowName = row.login;
  }

}
