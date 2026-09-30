import { ChangeDetectionStrategy, Component, Injector, inject, signal } from '@angular/core';
import { type PageEvent } from '@angular/material/paginator';
import { DrawerService } from '@pos-frontend/core';
import { type DebtorFilters, type DebtorsEntity, DebtorStore } from '@pos-frontend/debtors/data-access';
import { DebtorsListUiComponent } from '@pos-frontend/debtors/ui';

import { CreateDebtorsComponent } from '../create-debtors/create-debtors.component';
import { type UpdateDebtorsData, UpdateDebtorsComponent } from '../update-debtors/update-debtors.component';

const FIRST_PAGE: DebtorFilters = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-debtors',
  templateUrl: './list-debtors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DebtorsListUiComponent],
})
export class ListDebtorsComponent {
  private readonly drawer = inject(DrawerService);
  private readonly injector = inject(Injector);
  private readonly debtorStore = inject(DebtorStore);

  protected readonly debtors = this.debtorStore.paginatedDebtors;
  protected readonly total = this.debtorStore.totalDebtors;
  protected readonly loading = this.debtorStore.getPaginatedLoading;
  private readonly currentPage = signal<DebtorFilters>(FIRST_PAGE);

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
    this.drawer
      .open<CreateDebtorsComponent, boolean>(CreateDebtorsComponent, {
        title: 'Create New Debtor',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.load(FIRST_PAGE);
        }
      });
  }

  protected edit(debtor: DebtorsEntity): void {
    this.drawer
      .open<UpdateDebtorsComponent, boolean, UpdateDebtorsData>(UpdateDebtorsComponent, {
        title: 'Update Debtor',
        size: 'md',
        data: { debtor },
        injector: this.injector,
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
