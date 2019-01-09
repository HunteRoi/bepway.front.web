import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token, User } from '../../models/classes/Models';
import { TabsService } from '../../services/tabs.service';
import { UserService } from '../../services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { DataAccess } from '../data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabsService : TabsService;
  user:Observable<User>;
  currentUser:User;

  constructor(private router: Router, private userDataAccess: UserService, private messageService: MessageService) {
    this.tabsService = new TabsService("homeTab");
    this.userDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
   }

  async ngOnInit() {
    await this.gettingLogInfo();
  }

  async gettingLogInfo(){
    if (DataAccess.exists(DataAccess.TOKEN_KEY) && DataAccess.exists(DataAccess.USER_KEY)) {
      this.user = this.userDataAccess.getByLogin(DataAccess.deserializeStorage<string>(DataAccess.USER_KEY));
      this.user.subscribe(
        (result: User) => {
          if (result) {
            this.currentUser = result;
            this.tabsService.setActive();
          }
        },
        error => {
          console.log(error)
          this.router.navigateByUrl("login");
        });
    } else this.router.navigateByUrl('/login');
  }


  majToDo(){
    if(this.currentUser != null){
      
      console.log(document.getElementById("toDoBlock").innerHTML);
      this.userDataAccess.put(this.currentUser.id, this.currentUser).subscribe(
        next => this.log(`The to do list has been updated.`, 'alert alert-success'),
        error => this.log(`The update failed`, 'alert alert-error')
      );
      //window.location.reload();
    }
  }

  private log(message: string, classes?: string) {
    this.messageService.add(message, classes);
  }
}
