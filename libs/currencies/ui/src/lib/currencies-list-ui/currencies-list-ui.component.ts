import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { DatagridState } from '@pos-frontend/shared/utils';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CurrencyPipe } from '@angular/common';
import { CurrencyDetailsComponent } from '../currency-details/currency-details.component';

@Component({
    selector: 'pos-frontend-currencies-list-ui',
    templateUrl: './currencies-list-ui.component.html',
    styleUrls: ['./currencies-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatMenuModule, CurrencyDetailsComponent, CurrencyPipe]
})
export class CurrenciesListUiComponent implements OnInit {
  @Input() currenciesList: CurrenciesEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<DatagridState>();
  @Output() updateSelected = new EventEmitter<CurrenciesEntity>();
  @Output() viewCurrencyPermissions = new EventEmitter<string | number>();
  @Output() makeDefault = new EventEmitter<CurrenciesEntity>();
  @Output() updateRate = new EventEmitter<CurrenciesEntity>();

  readonly displayedColumns = ['name', 'code', 'status', 'isDefault', 'rate', 'actions'];
  readonly pageSizeOptions = [10, 25, 50];
  readonly pageSize = 10;
  expandedCurrency: CurrenciesEntity | null = null;

  ngOnInit(): void {
    this.updatedState.emit({ page: { from: 0, size: this.pageSize } });
  }

  onPage(event: PageEvent): void {
    this.updatedState.emit({
      page: { from: event.pageIndex * event.pageSize, size: event.pageSize },
    });
  }

  toggleDetail(currency: CurrenciesEntity): void {
    this.expandedCurrency = this.expandedCurrency === currency ? null : currency;
  }
}
