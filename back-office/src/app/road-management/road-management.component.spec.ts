import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadManagementComponent } from './road-management.component';

describe('RoadManagementComponent', () => {
  let component: RoadManagementComponent;
  let fixture: ComponentFixture<RoadManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
