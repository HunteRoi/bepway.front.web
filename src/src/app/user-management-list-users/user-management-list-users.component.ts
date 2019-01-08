import { Component, OnInit } from '@angular/core';
import { BepwayService } from '../services/bepway.service';
import { User } from '../model/classes/Models';

@Component({
  selector: 'app-user-management-list-users',
  templateUrl: './user-management-list-users.component.html',
  styleUrls: ['./user-management-list-users.component.css']
})
export class UserManagementListUsersComponent implements OnInit {
  readonly DEFAULT_PAGE_SIZE = 15;
  pageSize:number;
  pageIndex:number;
  pageIndexTable:number;
  total:number;
  users:User[];
  selectedRowLogin = "";
  selectedUser:User;

  constructor(private myApi:BepwayService) { }

  async ngOnInit() {
    this.total = 0;
    this.pageIndex = 0;
    this.pageIndexTable = 1;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    await this.getTotal();
    await this.getUsers();
  }

  async getUsers(){
    this.users = new Array();
    this.myApi.getUsers(this.pageIndex, this.pageSize)
      .subscribe(res=>{
        for(let user of res){
          this.users.push(user);
        }
      });
  }

  async getTotal(){
    this.myApi.getUsers(this.pageIndex, 1000)
    .subscribe(res=>{
      this.total = res.length;
    });
  }

  async pageChanged(event){
    this.pageIndexTable = event;
    this.pageIndex = event - 1;
    await this.getUsers();
  }

  selectUser(user){
    this.selectUser = user;
    this.selectedRowLogin = user.login;
  }
}
