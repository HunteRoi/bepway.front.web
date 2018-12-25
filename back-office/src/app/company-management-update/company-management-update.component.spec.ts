import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManagementUpdateComponent } from './company-management-update.component';

describe('CompanyManagementUpdateComponent', () => {
  let component: CompanyManagementUpdateComponent;
  let fixture: ComponentFixture<CompanyManagementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManagementUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManagementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
