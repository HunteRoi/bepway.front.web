import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsService } from '../tabs.service';
import { Company } from '../model/Company';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;

  tabsService : TabsService;
  updateDisabled : boolean = false;
  companiesArray : Array<Company>;
  columnsToDisplay = ['name', 'address', 'sector'];

  constructor() {
    this.tabsService = new TabsService("companyTab");
    this.companiesArray = new Array();

    this.companiesArray.push(new Company("Name","Address","Sector"));
    this.companiesArray.push(new Company("secondeName","secondAddress","secondSector"));
   }

  ngOnInit() {
    this.tabsService.setActive();
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.dataSource.addCompanies(this.companiesArray);
  }

  testFunction(row){
    console.log(row);
  }

  companySelected(){
    this.updateDisabled = true;
  }

}

