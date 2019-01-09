import { Component, OnInit } from '@angular/core';
import { Company, Zoning, Token } from '../../models/classes/Models';
import { CompanyService, ZoningService } from '../../services/api';
import { MessageService } from '../../services/message.service';
import { DataAccess } from '../data-access';
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
    this.totalZoning = await this.getTotalZonings();
    this.zonings = await this.getZonings();
    this.totalCompanies = await this.getTotalCompanies();
    this.companies = await this.getCompanies();
  }

  async getCompanies(): Promise<Company[]> {
    let companies = new Array<Company>();
    this.companyDataAccess.get(this.pageIndex, this.pageSize, ((this.selectedZoningId == this.NO_ZONING_SPECIFIED) ? undefined : this.selectedZoningId))
      .subscribe(res => {
        for(let company of res) {
          companies.push(company);
        }
      });
    return companies;
  }

  async getTotalCompanies(): Promise<number>{
    let total = 0;
    this.companyDataAccess.get(this.pageIndex, 0, ((this.selectedZoningId == this.NO_ZONING_SPECIFIED) ? undefined : this.selectedZoningId), undefined, undefined, undefined, 'response')
      .subscribe(res => total = Number.parseInt(res.headers.get("X-TotalCount")));
    return total;
  }

  async getTotalZonings(): Promise<number>{
    let total = 0;
    this.zoningDataAccess.get(this.pageIndex, 0, undefined, 'response')
      .subscribe(res => total = Number.parseInt(res.headers.get("X-TotalCount")));
    console.log(total);
    return total;
  }

  async getCompaniesAndGetTotal(){
    this.totalCompanies = await this.getTotalCompanies();
    await this.getCompanies();
  }

  async pageChanged(event){
    this.pageIndexTable = event ;
    this.pageIndex = event - 1;
    await this.getCompanies();
  }

  async getZonings(): Promise<Zoning[]> {
    let zonings = new Array<Zoning>();
    this.zoningDataAccess.get(0, this.totalZoning)
      .subscribe(res => {
        for(let zoning of res) {
          zonings.push(zoning);
        }
      });
    return zonings;
  }

  selectCompany(row){
    this.selectedRowName = row.name;
    this.selectedCompany = row;
  }

  deleteCompany(){
    if(this.selectedCompany == null){
        document.getElementById("errorMessage").innerHTML = "Veuillez sélectionner une entreprise";
    }
    else{
      
    }
  }

}
