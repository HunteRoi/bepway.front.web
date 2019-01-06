import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { TabsService } from '../services/tabs.service';
import { Company } from '../model/Company';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from '../services/data-table-datasource';
import { Router } from '@angular/router';
import { Coordinates } from '../model/Models';

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
  @Input() updateDisable: any;
  companiesArray : Array<Company>;
  columnsToDisplay = ['name', 'address', 'sector'];
  selectedRowName: string = "";
  selectedCompany : Company;

  constructor(private router: Router) {
    this.tabsService = new TabsService("companyTab");
   }

  ngOnInit() {
    this.tabsService.setActive();
    this.swapButton("listCompanies");
  }

  selectCompany(row: any){
    this.selectedRowName = row.name;
    this.selectedCompany = row;
    //this.updateDisabled = true;
  }

  swapButton(buttonId: string){
    this.removeOldActive();
    const element = document.getElementById(buttonId);
    if (element != null) {
      element.classList.toggle("active");
    }
  }

  removeOldActive(){
    let currentlyActiveButton = document.getElementById("listButtons").getElementsByClassName("active")[0];
    if (currentlyActiveButton != null ) currentlyActiveButton.classList.toggle("active");
  }
}
