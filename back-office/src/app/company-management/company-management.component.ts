import { Component, OnInit } from '@angular/core';
import { TabsService } from '../tabs.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  tabsService : TabsService;
  numberOfElement : any = "";
  updateDisabled : boolean = false;

  constructor() {
    this.tabsService = new TabsService("companyTab");
   }

  ngOnInit() {
    this.tabsService.setActive();
  }

  updateValue(event) {
    this.numberOfElement = event.target.value;
    }

  displayCompanies(){
    if(parseInt(this.numberOfElement) != NaN){
        // Call the API etc...
    }
  }

  companySelected(){
    this.updateDisabled = true;
  }

}

