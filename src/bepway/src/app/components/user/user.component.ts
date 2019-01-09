// A adapter :
// ajouter un ReactiveForm, 
// ajouter aussi l'asynchronisation pour afficher les informations QUAND ELLES SONT DISPONIBLES, 
// faire descendre les informations depuis DashboardComponent au lieu de les (re-)récupérer dans le HomeComponent

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { User, Token, SignupModel } from 'src/app/models/classes/Models';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from '../../services/api';
import { DataAccess } from '../data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  inputs : ['user'],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  /*public userForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    email: ['', Validators.required],
    birthdate: ['', Validators.required],
    roles: ['', Validators.required]
  });*/
  public user: User;
  public id = null;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private route: ActivatedRoute, private userDataAccess: UserService) {
    this.userDataAccess.configuration.apiKeys = {
      "Authorization": `Bearer ${DataAccess.deserializeStorage<Token>(DataAccess.TOKEN_KEY)['access_token']}`
    };
   }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === null) {
      // ADD ---> this.user: SignupModel;

      //this.userForm.addControl("password", new FormControl('', Validators.required));
    } else {
      // UPDATE ---> this.user: User;

      await this.setUser(Number.parseInt(this.id));
    }
  }

  async setUser(userId: number) {
    this.userDataAccess.getById(userId).subscribe(res => this.user = res);
  }

  onSubmit() {

  }

}
