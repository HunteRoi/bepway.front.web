import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoadManagementComponent } from './road-management/road-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'road-management', component: RoadManagementComponent },
      { path: 'company-management', component: CompanyManagementComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    RoadManagementComponent,
    CompanyManagementComponent,
    PageNotFoundComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debug only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
