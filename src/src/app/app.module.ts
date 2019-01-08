import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';
import { CompanyManagementAddListCompaniesComponent } from './company-management-add-list-companies/company-management-add-list-companies.component';
import { CompanyManagementUpdateComponent } from './company-management-update/company-management-update.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { UserManagementUpdateComponent } from './user-management-update/user-management-update.component';
import { UserManagementListUsersComponent } from './user-management-list-users/user-management-list-users.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-management', component: UserManagementComponent,
        children:[
          { path: 'list-users', component: UserManagementListUsersComponent },
          { path: 'update-user', component: UserManagementUpdateComponent },
          { path: '', redirectTo: 'list-users', pathMatch: 'full'}
        ]
      },
      { path: 'company-management', component: CompanyManagementComponent,
        children:[
          { path: 'list-companies', component: CompanyManagementAddListCompaniesComponent},
          { path: 'update-company', component: CompanyManagementUpdateComponent},
          { path: '', redirectTo: 'list-companies', pathMatch: 'full'}
        ] 
      },
      { path: '', redirectTo: '/login', pathMatch: 'full'},
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    CompanyManagementComponent,
    PageNotFoundComponent,
    HomeComponent,
    DashboardComponent,
    CompanyManagementAddListCompaniesComponent,
    CompanyManagementUpdateComponent,
    ErrorMessageComponent,
    UserManagementUpdateComponent,
    UserManagementListUsersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // debug only
    ),
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
