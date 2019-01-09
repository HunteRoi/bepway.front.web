import { Component, OnInit } from '@angular/core';
import { Company, Zoning, Token } from '../../models/classes/Models';
import { CompanyService, ZoningService } from '../../services/api';
import { MessageService } from '../../services/message.service';
import { DataAccess } from '../data-access';
import { TabsService } from '../../services/tabs.service';
import { resolve } from 'url';
import { getToken } from '@angular/router/src/utils/preactivation';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  readonly DEFAULT_PAGE_INDEX = 0;
  readonly DEFAULT_PAGE_SIZE = 15;
  readonly NO_ZONING_SPECIFIED = -1;
  readonly ADMIN_ROLE = "Admin";
  readonly GESTIONNARY_ROLE = "Gestionnary"
  tabsService : TabsService;
  pageSize:number;
  pageIndex:number;
  pageIndexTable:number;
  totalCompanies:number;
  totalZoning:number;
  companies:Company[];
  zonings:Zoning[];
  selectedZoningId:number;
  selectedRowName :String;
  selectedCompany : Company;
  deleteButton:any;

  constructor(private companyDataAccess: CompanyService, private zoningDataAccess: ZoningService, private messageService: MessageService) {
    this.tabsService = new TabsService("companyTab");
    companyDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
    zoningDataAccess.configuration.apiKeys = companyDataAccess.configuration.apiKeys;
  }

  async ngOnInit() {
    this.deleteButton = document.getElementById("deleteCompany");
    this.selectedZoningId = this.NO_ZONING_SPECIFIED;
    this.totalCompanies = 0;
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    this.tabsService.setActive();
    await this.setTotalZonings();
    await this.setZonings();
    await this.setTotalCompanies();
    await this.setCompanies();
  }

  async setCompanies() {
    this.companies = new Array<Company>();
    this.companyDataAccess.get(this.pageIndex, this.pageSize, ((this.selectedZoningId == this.NO_ZONING_SPECIFIED) ? undefined : this.selectedZoningId))
      .subscribe(res => this.companies = res);
  }

  async setTotalCompanies(){
    this.companyDataAccess.get(this.pageIndex, 0, ((this.selectedZoningId == this.NO_ZONING_SPECIFIED) ? undefined : this.selectedZoningId), undefined, undefined, undefined, 'response')
      .subscribe(res => this.totalCompanies = Number.parseInt(res.headers.get("X-TotalCount")));
  }

  async setTotalZonings(){
    this.zoningDataAccess.get(this.pageIndex, 0, undefined, 'response')
      .subscribe(res => this.totalZoning = Number.parseInt(res.headers.get("X-TotalCount")));
  }

  async getCompaniesAndGetTotal(){
    await this.setTotalCompanies();
    await this.setCompanies();
  }

  async pageChanged(event){
    this.pageIndexTable = event ;
    this.pageIndex = event - 1;
    await this.setCompanies();
  }

  async setZonings() {
    this.zonings = new Array<Zoning>();
    this.zoningDataAccess.get(0, this.totalZoning)
      .subscribe(res => this.zonings = res);
  }

  selectCompany(row){
    this.selectedRowName = row.name;
    this.selectedCompany = row;
  }

  deleteCompany(){
    if(this.selectedCompany == null) {
        // WE HAVE A FUCKING APP-MESSAGE COMPONENT
    } else {
      
    }
  }

}
