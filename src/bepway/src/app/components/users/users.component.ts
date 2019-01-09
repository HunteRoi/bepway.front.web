import { Component, OnInit } from '@angular/core';

import { User, Token } from '../../models/classes/Models';
import { UserService } from '../../services/api';
import { DataAccess } from '../data-access';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  readonly DEFAULT_PAGE_SIZE = 15;
  readonly ADMIN_ROLE = "Admin";
  public pageSize:number;
  public pageIndex:number;
  public pageIndexTable:number;
  public total:number;
  public users:User[];
  public selectedRowLogin:String;
  public selectedUser:User;

  constructor(private messageService: MessageService, private userDataAccess: UserService) {
    this.resetUsers();
    this.userDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
  }

  async ngOnInit() {
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    await this.setTotal();
    await this.setUsers();
  }

  async setUsers(){
    this.userDataAccess.get(this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let user of res){
          this.users.push(user);
        }
    });
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

  deleteUser() {
    this.userDataAccess._delete(this.selectedUser.id).subscribe(
      next => this.log(`The user ${this.selectedUser.login} has been removed.`, 'alert alert-success'),
      error => this.log(`The user ${this.selectedUser.login} couldn't be removed : ${error}`, 'alert alert-error')
    );
    //window.location.reload();
  }

  private log(message: string, classes?: string) {
    this.messageService.add(message, classes);
  }

}
