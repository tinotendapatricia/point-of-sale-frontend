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
import { type CreditorFilters, type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

import { type CreateCreditorsData, CreateCreditorsComponent } from '../create-creditors/create-creditors.component';

const FIRST_PAGE: CreditorFilters = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-creditors',
  templateUrl: './list-creditors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class ListCreditorsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly creditorStore = inject(CreditorStore);

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly currentPage = signal<CreditorFilters>(FIRST_PAGE);

  protected readonly total = this.creditorStore.totalCreditors;
  protected readonly loading = this.creditorStore.getPaginatedLoading;
  protected readonly dataSource = computed(() => new MatTableDataSource(this.creditorStore.paginatedCreditors()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'account', header: 'Account' },
    { key: 'name', header: 'Name' },
    { key: 'address', header: 'Address' },
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
      .open<CreateCreditorsComponent, CreateCreditorsData, boolean>(CreateCreditorsComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.load(FIRST_PAGE);
        }
      });
  }

  protected edit(creditor: CreditorsEntity): void {
    this.dialog
      .open<CreateCreditorsComponent, CreateCreditorsData, boolean>(CreateCreditorsComponent, {
        width: '480px',
        data: { creditor },
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }

  private load(filters: CreditorFilters): void {
    this.currentPage.set(filters);
    this.creditorStore.getPaginatedCreditors(filters);
  }
}
