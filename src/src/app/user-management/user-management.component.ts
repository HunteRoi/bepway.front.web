import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { TabsService } from '../services/tab.service';
import { MatPaginator, MatSort } from '@angular/material';
import { UserDataTable } from '../services/user-data-table-datasource';
import { BepwayService } from '../services/bepway.service';

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
  selectedRowName = "";
  columnsToDisplay = ['Login', 'Email', 'Role'];

  constructor(private myApi: BepwayService) {
    this.tabsService = new TabsService("userTab");
   }

  ngOnInit() {
    this.tabsService.setActive();
    this.dataSource = new UserDataTable(this.paginator, this.sort, this.myApi);
    //this.getUsers();
  }

  selectCompany(row){
    this.selectedRowName = row.login;
  }

}
