import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { TabsService } from '../tabs.service';
import { Company } from '../model/Company';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from '../data-table-datasource';
import { Router } from '@angular/router';

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
    this.companiesArray = [
      new Company("Name1", "Address1", "Sector1"),
      new Company("Name2", "Address2", "Sector2")
    ]; //for testing purpose
   }

  ngOnInit() {
    this.tabsService.setActive();
    this.swapButton("listCompanies");
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.dataSource.addCompanies(this.companiesArray);
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
