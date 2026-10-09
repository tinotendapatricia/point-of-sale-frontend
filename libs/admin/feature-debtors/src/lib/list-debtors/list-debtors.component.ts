import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { type DebtorFilters, type DebtorsEntity, DebtorStore } from '@pos-frontend/debtors/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

import { type CreateDebtorsData, CreateDebtorsComponent } from '../create-debtors/create-debtors.component';

const FIRST_PAGE: DebtorFilters = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-debtors',
  templateUrl: './list-debtors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class ListDebtorsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly debtorStore = inject(DebtorStore);

  private readonly discountTpl = viewChild<TemplateRef<unknown>>('discountTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly currentPage = signal<DebtorFilters>(FIRST_PAGE);

  protected readonly total = this.debtorStore.totalDebtors;
  protected readonly loading = this.debtorStore.getPaginatedLoading;
  protected readonly dataSource = computed(() => new MatTableDataSource(this.debtorStore.paginatedDebtors()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'account', header: 'Account' },
    { key: 'name', header: 'Name' },
    { key: 'discount', header: 'Discount', template: this.discountTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.load(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.load({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.load(this.currentPage());
  }

  protected add(): void {
    this.dialog
      .open<CreateDebtorsComponent, CreateDebtorsData, boolean>(CreateDebtorsComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.load(FIRST_PAGE);
        }
      });
  }

  protected edit(debtor: DebtorsEntity): void {
    this.dialog
      .open<CreateDebtorsComponent, CreateDebtorsData, boolean>(CreateDebtorsComponent, {
        width: '480px',
        data: { debtor },
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }

  private load(filters: DebtorFilters): void {
    this.currentPage.set(filters);
    this.debtorStore.getPaginatedDebtors(filters);
  }
}
