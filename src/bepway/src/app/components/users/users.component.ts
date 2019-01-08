import { Component, OnInit } from '@angular/core';

import { User, Token } from '../../models/classes/Models';
import { UserService } from '../../services/api';
import { DataAccess } from '../data-access';

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

  constructor(private userDataAccess: UserService) {
    this.userDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
  }

  async ngOnInit() {
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    this.total = await this.getTotal();
    this.users = await this.getUsers();
  }

  async getUsers(){
    let users = new Array();
    this.userDataAccess.get(this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let user of res){
          users.push(user);
        }
    });
    return users;
  }

  async getTotal(){
    this.userDataAccess.get(this.pageIndex, 1000)
      .subscribe(res=>{
        return res.length;
      });
  }

  async pageChanged(event){
    this.pageIndexTable = event;
    this.pageIndex = event - 1;
    await this.getUsers();
  }

  selectUser(user){
    this.selectedUser = user;
    this.selectedRowLogin = user.login;
  }

  deleteUser(){
    
  }

}
