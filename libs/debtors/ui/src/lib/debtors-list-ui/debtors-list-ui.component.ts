import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { DatagridState } from '@pos-frontend/shared/utils';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'pos-frontend-debtors-list-ui',
    templateUrl: './debtors-list-ui.component.html',
    styleUrls: ['./debtors-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class DebtorsListUiComponent implements OnInit {
  @Input() debtorsList: DebtorsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<DatagridState>();
  @Output() updateSelected = new EventEmitter<any>();

  readonly displayedColumns = ['account', 'name', 'discount', 'actions'];
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
