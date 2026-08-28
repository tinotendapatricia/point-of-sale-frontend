import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
//import { GroupsEntity, GroupsFacade } from '@pos-frontend/groups/data-access';

import { UsersFacade } from '@pos-frontend/users/data-access';
import { UserFormComponent } from '../../../../../users/ui/src/lib/user-form/user-form.component';
import { AsyncPipe } from '@angular/common';
//import { GroupsFacade } from '@pos-frontend/groups/data-access';

@Component({
    selector: 'pos-frontend-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UserFormComponent, AsyncPipe]
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
