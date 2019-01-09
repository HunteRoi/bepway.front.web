import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../services/tabs.service';
import { User, Token } from '../../models/classes/Models';
import { UserService } from '../../services/api';
import { DataAccess } from '../data-access';
import { MessageService } from 'src/app/services/message.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  readonly DEFAULT_PAGE_SIZE = 15;
  readonly ADMIN_ROLE = "Admin";
  public tabsService : TabsService;
  public pageSize:number;
  public pageIndex:number;
  public pageIndexTable:number;
  public total:number;
  public users:User[];
  public selectedRowLogin:String;
  public selectedUser:User;
  private readonly notifier: NotifierService;

  constructor(private router: Router, private messageService: MessageService, private userDataAccess: UserService, notifier: NotifierService) {
    this.notifier = notifier;

    this.tabsService = new TabsService("userTab");
    this.resetUsers();
    this.userDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
  }

  async ngOnInit() {
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    this.tabsService.setActive();
    await this.setTotal();
    await this.setUsers();
  }

  async setUsers(){
    this.userDataAccess.get(this.pageIndex, this.pageSize)
      .subscribe(res=> this.users = res);
  }

  async setTotal() {
    this.userDataAccess.get(this.pageIndex, 0, undefined, 'response')
      .subscribe(res => {
        this.total = Number.parseInt(res.headers.get("X-TotalCount"))
      });
  }

  async pageChanged(index: number) {
    this.resetUsers();
    this.pageIndexTable = index;
    this.pageIndex = index - 1;
    await this.setUsers();
  }

  private resetUsers() {
    this.users = new Array<User>();
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.selectedRowLogin = user.login;
  }

  updateUser(){
    this.router.navigateByUrl(`/user/${this.selectedUser.id}`);
  }

  deleteUser() {
    this.userDataAccess._delete(this.selectedUser.id).subscribe(
      next => this.log(`The user ${this.selectedUser.login} has been removed.`, 'alert alert-success'),
      error => this.log(`The user ${this.selectedUser.login} couldn't be removed : ${error}`, 'alert alert-error')
    );

    this.notifier.show({
      type: 'success', 
      message: 'The page is going to reload!', 
      id: 'reload-notif'
    });
    
    setTimeout(this.hideNotificationsAndReload, 3000);
  }

  private hideNotificationsAndReload() {
    this.notifier.hide('reload-notif');
    window.location.reload();
  }

  private log(message: string, classes?: string) {
    this.messageService.add(message, classes);
  }

}
