import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { TabsService } from '../tabs.service';
import { Company } from '../model/Company';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { Router } from '@angular/router';
import { OutputType } from '@angular/core/src/view';

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
  @Input() updateDisable;
  companiesArray : Array<Company>;
  columnsToDisplay = ['name', 'address', 'sector'];
  selectedRowName: string = "";
  selectedCompany : Company;

  constructor(private router: Router) {
    this.tabsService = new TabsService("companyTab");
    this.companiesArray = new Array();

    this.companiesArray.push(new Company("Name","Address","Sector"));
    this.companiesArray.push(new Company("secondeName","secondAddress","secondSector"));
   }

  ngOnInit() {
    this.tabsService.setActive();
    this.swapButton("listCompanies");
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.dataSource.addCompanies(this.companiesArray);
  }

  selectCompany(row){
    this.selectedRowName = row.name;
    this.selectedCompany = row;
    //this.updateDisabled = true;
  }

  swapButton(button){
    this.removeOldActive();
    switch(button){
      case 'listCompanies':
        document.getElementById(button).classList.toggle("active");
        this.router.navigateByUrl("/home");
        break;
      case 'addCompany' : 
        document.getElementById(button).classList.toggle("active");
        break;
      case 'updateCompany' : 
        document.getElementById(button).classList.toggle("active");
        break;
    }
  }

  removeOldActive(){
    let div = document.getElementById("listButtons");
    let activeButton = div.getElementsByClassName("active")[0];
    if(activeButton != null ) activeButton.classList.toggle("active");
  }

}

