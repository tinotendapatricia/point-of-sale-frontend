import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { DatagridState } from '@pos-frontend/shared/utils';
import { CreditorsEntity } from '@pos-frontend/creditors/data-access';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'pos-frontend-list-creditors-ui',
    templateUrl: './list-creditors-ui.component.html',
    styleUrls: ['./list-creditors-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class ListCreditorsUiComponent implements OnInit {
  @Input() creditorsList: CreditorsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<DatagridState>();
  @Output() updateSelected = new EventEmitter<CreditorsEntity>();

  readonly displayedColumns = ['account', 'name', 'address', 'actions'];
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
