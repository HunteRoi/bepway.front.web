import { Component, OnInit } from '@angular/core';
import { Company, Zoning } from '../../models/classes/Models';
import { CompanyService, ZoningService } from '../../services/api';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  readonly DEFAULT_PAGE_SIZE = 15;
  readonly NO_ZONING_SPECIFIED = -1;
  readonly ADMIN_ROLE = "Admin";
  readonly GESTIONNARY_ROLE = "Gestionnary"
  pageSize:number;
  pageIndex:number;
  pageIndexTable:number;
  total:number;
  companies:Company[];
  zonings:Zoning[];
  selectedZoningId:number;
  selectedRowName :String;
  selectedCompany : Company;
  deleteButton:any;

  constructor(private companyDataAccess: CompanyService, private zoningDataAccess: ZoningService, private messageService: MessageService) { }

  async ngOnInit() {
    this.deleteButton = document.getElementById("deleteCompany");
    this.selectedZoningId = this.NO_ZONING_SPECIFIED;
    this.total = 0;
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    //await this.getTotal();
    await this.getCompanies();
    await this.getZonings();
  }

  async getCompanies(){
    this.companies = new Array();
    if(this.selectedZoningId == this.NO_ZONING_SPECIFIED){
      this.companyDataAccess.get(this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let company of res){
          this.companies.push(company);
        }
      });
    }
    else{
      this.companyDataAccess.get(this.pageIndex, this.pageSize,this.selectedZoningId)
      .subscribe(res=>{
        for(let company of res){
          this.companies.push(company);
        }
      });
    }
  }

  // async getTotal(){
  //   if(this.selectedZoningId == this.NO_ZONING_SPECIFIED){
  //     this.companyDataAccess.getAllCompanies(this.pageIndex, 10000)
  //     .subscribe(res=>{
  //       this.total = res.length;
  //     });
  //   }
  //   else{
  //     this.companyDataAccess.getAllCompaniesByZoning(this.selectedZoningId,this.pageIndex, 10000)
  //     .subscribe(res=>{
  //       this.total = res.length;
  //     });
  //   }
  // }

  getCompaniesAndGetTotal(){
    //this.getTotal();
    this.getCompanies();
  }

  async pageChanged(event){
    this.pageIndexTable = event ;
    this.pageIndex = event - 1;
    await this.getCompanies();
  }

  async getZonings(){
    this.zoningDataAccess.get()
      .subscribe(zonings => this.zonings = zonings);
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
