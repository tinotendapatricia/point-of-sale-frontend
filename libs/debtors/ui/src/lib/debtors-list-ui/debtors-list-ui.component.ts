import { ChangeDetectionStrategy, Component, type TemplateRef, computed, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

/** Presentational debtors table: rows, paging and actions in, user intents out. */
@Component({
  selector: 'pos-frontend-debtors-list-ui',
  templateUrl: './debtors-list-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class DebtorsListUiComponent {
  readonly debtors = input<DebtorsEntity[]>([]);
  readonly total = input(0);
  readonly loading = input(false);

  readonly page = output<PageEvent>();
  readonly added = output<void>();
  readonly refreshed = output<void>();
  readonly edited = output<DebtorsEntity>();

  private readonly discountTpl = viewChild<TemplateRef<unknown>>('discountTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly dataSource = computed(() => new MatTableDataSource(this.debtors()));

  // computed() because the templates resolve after the first render
  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'account', header: 'Account' },
    { key: 'name', header: 'Name' },
    { key: 'discount', header: 'Discount', template: this.discountTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);
}
