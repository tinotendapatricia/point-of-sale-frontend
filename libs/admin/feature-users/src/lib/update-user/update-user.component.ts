import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Location, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';
import { UserFormComponent } from '../../../../../users/ui/src/lib/user-form/user-form.component';


@Component({
    selector: 'pos-frontend-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UserFormComponent, AsyncPipe]
})
export class UpdateUserComponent implements OnInit {
  @Input() user!:UsersEntity
  @Output() closeModal = new EventEmitter()
  constructor(

    public usersFacade: UsersFacade,
    private location: Location,

  ) {}

  ngOnInit(): void {
  //this.usersFacade.getUserById(this.route.snapshot.paramMap.get('userId')!);
   
  }

  public updateUser(user: any) {
    this.usersFacade.updateUser(user);
    this.usersFacade.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true): null;
    });
  }

  public goBack() {
    this.location.back();
  }
}
