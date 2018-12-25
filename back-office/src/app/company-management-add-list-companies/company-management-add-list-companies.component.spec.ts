import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManagementAddListCompaniesComponent } from './company-management-add-list-companies.component';

describe('CompanyManagementAddListCompaniesComponent', () => {
  let component: CompanyManagementAddListCompaniesComponent;
  let fixture: ComponentFixture<CompanyManagementAddListCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManagementAddListCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManagementAddListCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
