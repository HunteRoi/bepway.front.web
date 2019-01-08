import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementListUsersComponent } from './user-management-list-users.component';

describe('UserManagementListUsersComponent', () => {
  let component: UserManagementListUsersComponent;
  let fixture: ComponentFixture<UserManagementListUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementListUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
