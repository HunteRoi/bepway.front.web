import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Company, Coordinates, Zoning } from '../model/classes/Models';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from '../services/data-table-datasource';
import { BepwayService } from '../services/bepway.service';

@Component({
  selector: 'app-company-management-add-list-companies',
  templateUrl: './company-management-add-list-companies.component.html',
  styleUrls: ['./company-management-add-list-companies.component.css']
})
export class CompanyManagementAddListCompaniesComponent implements OnInit {

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // dataSource: DataTableDataSource;
  // zonings : Zoning[];
  // companiesToDisplay : Company[];
  // selectedZoning:any = "";
  // NO_ZONING_SPECIFIED = -1;

  // @Input() updateDisabled:boolean;
  // companiesArray : Array<Company>;
  // columnsToDisplay = ['name', 'address', 'sector'];
  // selectedRowName = "";
  // selectedCompany : Company;

  readonly DEFAULT_PAGE_SIZE = 15;
  pageSize:number;
  pageIndex:number;
  pageIndexTable:number;
  total:number;
  companies:Company[];

  constructor(private myApi: BepwayService) {
  }

  async ngOnInit() {
    this.swapButton("listCompanies");
    this.total = 0;
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    await this.getTotal();
    await this.getCompanies();
    console.log(this.companies);
    // this.getZonings();
    // this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.myApi, null);
    //this.getAllCompanies();
    //this.dataSource.addCompanies(this.companiesArray);
  }

  async getCompanies(){
    this.companies = new Array();
    this.myApi.getAllCompanies(this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let company of res){
          this.companies.push(company);
        }
      });
      console.log(this.pageIndex);
  }

  async getTotal(){
    this.myApi.getAllCompanies(this.pageIndex, 10000)
    .subscribe(res=>{
      this.total = res.length;
    });
  }

  async pageChanged(event){
    this.pageIndexTable = event ;
    this.pageIndex = event - 1;
    await this.getCompanies();
  }

  // getZonings(){
  //   this.myApi.getAllZonings()
  //     .subscribe(zonings => this.zonings = zonings);
  //   //console.log(this.zonings);
  // }

  // getAllCompanies(){
  //   this.myApi.getAllCompanies(0, 15)
  //   .subscribe(result => console.log(result));
  // }

  // getCompaniesByZoning(){
  //   this.selectedZoning = Number(this.selectedZoning);
  //   this.myApi.getAllCompaniesByZoning(this.selectedZoning)
  //   .subscribe(companies => this.companiesToDisplay = companies);
  //   console.log(this.companiesToDisplay);
  // }

  // selectCompany(row){
  //   this.selectedRowName = row.name;
  //   this.selectedCompany = row;
  //   this.updateDisabled = true;
  // }


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
