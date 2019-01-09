import { Component, OnInit } from '@angular/core';
import { User, Token } from 'src/app/models/classes/Models';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from '../../services/api';
import { DataAccess } from '../data-access';

@Component({
  selector: 'app-user',
  inputs : ['user'],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute, private userDataAccess: UserService) {
    this.userDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
   }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      // ADD
    } else {
      // UPDATE
      await this.setUser(Number.parseInt(id));
    }
  }

  async setUser(userId:number){
    this.userDataAccess.getById(userId)
      .subscribe(res=> this.user = res);
  }

}
