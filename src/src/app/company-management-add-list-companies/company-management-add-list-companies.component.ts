import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Company, Coordinates, Zoning } from '../model/classes/Models';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from '../services/data-table-datasource';
import { BepwayService } from '../services/bepway.service';
import { CompanyManagementComponent } from '../company-management/company-management.component';
import { Router } from '@angular/router';

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
 

  readonly DEFAULT_PAGE_SIZE = 15;
  readonly NO_ZONING_SPECIFIED = -1;
  pageSize:number;
  pageIndex:number;
  pageIndexTable:number;
  total:number;
  companies:Company[];
  zonings:Zoning[];
  selectedZoningId:number;
  selectedRowName = "";
  selectedCompany : Company;
  deleteButton:any;

  constructor(private myApi: BepwayService) {
  }

  async ngOnInit() {
    this.deleteButton = document.getElementById("deleteCompany");
    this.swapButton("listCompanies");
    this.selectedZoningId = this.NO_ZONING_SPECIFIED;
    this.total = 0;
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    await this.getTotal();
    await this.getCompanies();
    await this.getZonings();
  }

  async getCompanies(){
    this.companies = new Array();
    if(this.selectedZoningId == this.NO_ZONING_SPECIFIED){
      this.myApi.getAllCompanies(this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let company of res){
          this.companies.push(company);
        }
      });
    }
    else{
      this.myApi.getAllCompaniesByZoning(this.selectedZoningId,this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let company of res){
          this.companies.push(company);
        }
      });
    }
  }

  async getTotal(){
    if(this.selectedZoningId == this.NO_ZONING_SPECIFIED){
      this.myApi.getAllCompanies(this.pageIndex, 10000)
      .subscribe(res=>{
        this.total = res.length;
      });
    }
    else{
      this.myApi.getAllCompaniesByZoning(this.selectedZoningId,this.pageIndex, 10000)
      .subscribe(res=>{
        this.total = res.length;
      });
    }
  }

  getCompaniesAndGetTotal(){
    this.getTotal();
    this.getCompanies();
  }

  async pageChanged(event){
    this.pageIndexTable = event ;
    this.pageIndex = event - 1;
    await this.getCompanies();
  }

  async getZonings(){
    this.myApi.getAllZonings()
      .subscribe(zonings => this.zonings = zonings);
  }

  selectCompany(row){
    this.selectedRowName = row.name;
    this.selectedCompany = row;
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
