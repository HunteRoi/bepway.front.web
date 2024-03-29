import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './modules/app-routing.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

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
import { BASE_PATH } from './variables';
import { environment } from 'src/environments/environment';
import { ErrorInterceptor } from './helpers/error.interceptor';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 2000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    MatSelectModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [ 
    APIS, 
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
