import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  type CurrencyEntity,
  CurrencyStore,
} from '@pos-frontend/currencies/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import {
  CreateCurrencyComponent,
  type CreateCurrencyData,
} from '../create-currency/create-currency.component';
import {
  MakeDefaultComponent,
  type MakeDefaultData,
} from '../make-default/make-default.component';
import {
  UpdateRateComponent,
  type UpdateRateData,
} from '../update-rate/update-rate.component';
import { MatCardModule } from '@angular/material/card';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-currencies-list',
  templateUrl: './currencies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatIconModule, MatButtonModule, MatMenuModule, CurrencyPipe, MatCardModule],
})
export class CurrenciesListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly currencyStore = inject(CurrencyStore);

  private readonly rateTpl = viewChild<TemplateRef<unknown>>('rateTpl');
  private readonly defaultTpl = viewChild<TemplateRef<unknown>>('defaultTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly loading = this.currencyStore.getPaginatedLoading;
  protected readonly total = this.currencyStore.totalCurrencies;
  protected readonly dataSource = computed(
    () => new MatTableDataSource(this.currencyStore.paginatedCurrencies())
  );

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'symbol', header: 'Symbol' },
    { key: 'rate', header: 'Rate to Default', align: 'right', template: this.rateTpl() },
    { key: 'isDefault', header: 'Default', align: 'center', template: this.defaultTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.currencyStore.getPaginatedCurrencies(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.currencyStore.getPaginatedCurrencies({
      page: event.pageIndex,
      size: event.pageSize,
    });
  }

  protected add(): void {
    this.dialog
      .open<CreateCurrencyComponent, CreateCurrencyData, boolean>(CreateCurrencyComponent, {
        width: '480px',
      })
      .afterClosed()
      .subscribe((created) => this.refreshIf(created));
  }

  protected edit(currency: CurrencyEntity): void {
    this.dialog
      .open<CreateCurrencyComponent, CreateCurrencyData, boolean>(CreateCurrencyComponent, {
        width: '480px',
        data: { currency },
      })
      .afterClosed()
      .subscribe((updated) => this.refreshIf(updated));
  }

  protected makeDefault(currency: CurrencyEntity): void {
    this.dialog
      .open<MakeDefaultComponent, MakeDefaultData, boolean>(MakeDefaultComponent, {
        width: '420px',
        data: { currency },
      })
      .afterClosed()
      .subscribe((changed) => this.refreshIf(changed));
  }

  protected updateRate(currency: CurrencyEntity): void {
    this.dialog
      .open<UpdateRateComponent, UpdateRateData, boolean>(UpdateRateComponent, {
        width: '420px',
        data: { currency },
      })
      .afterClosed()
      .subscribe((updated) => this.refreshIf(updated));
  }

  private refreshIf(changed: boolean | undefined): void {
    if (changed) {
      this.currencyStore.getPaginatedCurrencies(FIRST_PAGE);
    }
  }
}
