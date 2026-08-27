import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
//import { ClrDatagridStateInterface } from '@clr/angular';
import { UsersEntity } from '@pos-frontend/users/data-access';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
    selector: 'pos-frontend-list-users-ui',
    templateUrl: './list-users-ui.component.html',
    styleUrls: ['./list-users-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListUsersUiComponent implements OnChanges {
  @Input() userList: UsersEntity[] = [];
  @Input() total = 0;
  @Input() loading!: boolean;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<UsersEntity>();
  @Output() viewSelected = new EventEmitter<UsersEntity>();
  @Output() changeSelectedUserStatus = new EventEmitter<UsersEntity>();
  @Output() changeSelectedUserPassword = new EventEmitter<UsersEntity>();
  @Output() viewUserAuthorities = new EventEmitter<UsersEntity>();
  selectedUser!: UsersEntity[];

  ngOnChanges(changes: SimpleChanges): void {}
}
