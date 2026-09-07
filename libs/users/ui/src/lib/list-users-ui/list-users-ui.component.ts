import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  input,
  output,
  effect,
} from '@angular/core';
import { UsersEntity } from '@pos-frontend/users/data-access';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

export interface UsersPageState {
  page?: { from: number; size: number };
}

@Component({
    selector: 'pos-frontend-list-users-ui',
    templateUrl: './list-users-ui.component.html',
    styleUrls: ['./list-users-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatChipsModule, MatButtonModule]
})
export class ListUsersUiComponent implements OnInit {
  readonly userList = input<UsersEntity[]>([]);
  readonly total = input(0);
  readonly loading = input(false);
  readonly placeholderMessage = input('');

  readonly updatedState = output<UsersPageState>();
  readonly updateSelected = output<UsersEntity>();
  readonly viewSelected = output<UsersEntity>();
  readonly changeSelectedUserStatus = output<UsersEntity>();
  readonly changeSelectedUserPassword = output<UsersEntity>();
  readonly viewUserAuthorities = output<UsersEntity>();

  readonly displayedColumns = ['username', 'name', 'status', 'actions'];
  readonly dataSource = new MatTableDataSource<UsersEntity>([]);
  readonly pageSizeOptions = [10, 25, 50];
  readonly pageSize = 10;

  constructor() {
    effect(() => {
      this.dataSource.data = this.userList();
    });
  }

  ngOnInit(): void {
    this.updatedState.emit({ page: { from: 0, size: this.pageSize } });
  }

  onPage(event: PageEvent) {
    this.updatedState.emit({
      page: { from: event.pageIndex * event.pageSize, size: event.pageSize },
    });
  }
}
