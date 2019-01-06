import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Company, Coordinates } from '../model/models';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from '../services/data-table-datasource';

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
    this.companiesArray = [
      new Company(0, "idOpenData0", "name0", "address0", new Coordinates(50, 5), 0, new Date()),
      new Company(1, "idOpenData1", "name1", "address1", new Coordinates(50, 5), 0, new Date()),
      new Company(2, "idOpenData2", "name2", "address2", new Coordinates(50, 5), 0, new Date()),
      new Company(3, "idOpenData3", "name3", "address3", new Coordinates(50, 5), 0, new Date()),
      new Company(4, "idOpenData4", "name4", "address4", new Coordinates(50, 5), 0, new Date()),
      new Company(5, "idOpenData5", "name5", "address5", new Coordinates(50, 5), 0, new Date()),
      new Company(6, "idOpenData6", "name6", "address6", new Coordinates(50, 5), 0, new Date()),
      new Company(7, "idOpenData7", "name7", "address7", new Coordinates(50, 5), 0, new Date()),
      new Company(8, "idOpenData8", "name8", "address8", new Coordinates(50, 5), 0, new Date()),
      new Company(9, "idOpenData9", "name9", "address9", new Coordinates(50, 5), 0, new Date()),
      new Company(10, "idOpenData10", "name10", "address10", new Coordinates(50, 5), 0, new Date()),
      new Company(11, "idOpenData11", "name11", "address11", new Coordinates(50, 5), 0, new Date()),
      new Company(12, "idOpenData12", "name12", "address12", new Coordinates(50, 5), 0, new Date()),
      new Company(13, "idOpenData13", "name13", "address13", new Coordinates(50, 5), 0, new Date()),
      new Company(14, "idOpenData14", "name14", "address14", new Coordinates(50, 5), 0, new Date()),
      new Company(15, "idOpenData15", "name15", "address15", new Coordinates(50, 5), 0, new Date()),
      new Company(16, "idOpenData16", "name16", "address16", new Coordinates(50, 5), 0, new Date()),
      new Company(17, "idOpenData17", "name17", "address17", new Coordinates(50, 5), 0, new Date())
    ]; //for testing purpose
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
