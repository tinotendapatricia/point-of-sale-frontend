import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GroupsEntity } from '@pos-frontend/groups/data-access';
import { DatagridState } from '@pos-frontend/shared/utils';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'pos-frontend-list-groups-ui',
    templateUrl: './list-groups-ui.component.html',
    styleUrls: ['./list-groups-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class ListGroupsUiComponent implements OnInit {
  @Input() groupsList: GroupsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<DatagridState>();
  @Output() viewGroupPermissions = new EventEmitter<string | number>();

  readonly displayedColumns = ['name', 'createdBy', 'permissions', 'actions'];
  readonly pageSizeOptions = [10, 25, 50];
  readonly pageSize = 10;

  ngOnInit(): void {
    this.updatedState.emit({ page: { from: 0, size: this.pageSize } });
  }

  onPage(event: PageEvent): void {
    this.updatedState.emit({
      page: { from: event.pageIndex * event.pageSize, size: event.pageSize },
    });
  }
}
