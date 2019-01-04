import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Company } from '../model/Company';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from '../data-table-datasource';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-company-management-add-list-companies',
  templateUrl: './company-management-add-list-companies.component.html',
  styleUrls: ['./company-management-add-list-companies.component.css']
})
export class CompanyManagementAddListCompaniesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;

  @Input() updateDisabled:boolean;
  companiesArray : Array<Company>;
  columnsToDisplay = ['name', 'address', 'sector'];
  selectedRowName: string = "";
  selectedCompany : Company;

  constructor() {
    this.companiesArray = new Array();
    this.companiesArray.push(new Company("Name","Address","Sector"));
    this.companiesArray.push(new Company("secondeName","secondAddress","secondSector"));
   }

   ngOnInit() {
    this.swapButton("listCompanies");
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.dataSource.addCompanies(this.companiesArray);
  }

  selectCompany(row){
    this.selectedRowName = row.name;
    this.selectedCompany = row;
    this.updateDisabled = true;
  }


  swapButton(button){
    this.removeOldActive();
    switch(button){
      case 'listCompanies':
        document.getElementById(button).classList.toggle("active");
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
