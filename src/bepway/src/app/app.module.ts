import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/company/company.component';
import { MessageComponent } from './components/message/message.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { APIS } from './services/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    UserComponent,
    CompaniesComponent,
    CompanyComponent,
    MessageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [ APIS ],
  bootstrap: [AppComponent]
})
export class AppModule { }