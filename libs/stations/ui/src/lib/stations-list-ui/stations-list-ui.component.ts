import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { DatagridState } from '@pos-frontend/shared/utils';
import { StationsEntity } from '@pos-frontend/stations/data-access';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'pos-frontend-stations-list-ui',
    templateUrl: './stations-list-ui.component.html',
    styleUrls: ['./stations-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class StationsListUiComponent implements OnInit {
  @Input() stationsList: StationsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<DatagridState>();
  @Output() viewStationPermissions = new EventEmitter<string | number>();

  readonly displayedColumns = ['number', 'name', 'actions'];
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
