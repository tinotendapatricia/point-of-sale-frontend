import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
//import { GroupsEntity, GroupsFacade } from '@pos-frontend/groups/data-access';

import { UsersFacade } from '@pos-frontend/users/data-access';
//import { GroupsFacade } from '@pos-frontend/groups/data-access';

@Component({
    selector: 'pos-frontend-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    standalone: false
})
export class CreateUserComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
 
  constructor(
    public usersService: UsersFacade,
    private router: Router,
   
  ) {}

  ngOnInit(): void {

    this.usersService.getAllUsers()
  }

  public createUser(user: any) {
    this.usersService.createNewUser(user);
    this.usersService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true): null;
    });
  }
}
