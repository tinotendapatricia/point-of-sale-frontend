import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClrLoadingState } from '@clr/angular';
import { GroupsEntity } from '@pos-frontend/groups/data-access';
//import { GroupsEntity } from '@pos-frontend/groups/data-access';
//import { ClrLoadingState } from '@clr/angular';
//import { GroupsEntity } from '@pos-frontend/groups/data-access';
import { UsersEntity } from '@pos-frontend/users/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'pos-frontend-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user!: UsersEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() groups: GroupsEntity[] = [];
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  //@Input() allGroups$!: Observable<GroupsEntity[]>;
  @Input() btnTitle!: string;
  public userForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(UserFormComponent);
  }

  ngOnInit(): void {
    this.createForm();
    if (this.user) {
      this.userForm.patchValue(this.user);
      
    }
  }

  public createForm() {
    this.userForm = this.formBuilder.group({
      username: [''],
      name: '',
      password: [''],
      id: '',
    });
  }
}
