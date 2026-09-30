import { ChangeDetectionStrategy, Component, Injector, inject, signal } from '@angular/core';
import { type PageEvent } from '@angular/material/paginator';
import { DrawerService } from '@pos-frontend/core';
import { type CreditorFilters, type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';
import { ListCreditorsUiComponent } from '@pos-frontend/creditors/ui';

import { CreateCreditorsComponent } from '../create-creditors/create-creditors.component';
import { type UpdateCreditorData, UpdateCreditorComponent } from '../update-creditor/update-creditor.component';

const FIRST_PAGE: CreditorFilters = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-creditors',
  templateUrl: './list-creditors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListCreditorsUiComponent],
})
export class ListCreditorsComponent {
  private readonly drawer = inject(DrawerService);
  private readonly injector = inject(Injector);
  private readonly creditorStore = inject(CreditorStore);

  protected readonly creditors = this.creditorStore.paginatedCreditors;
  protected readonly total = this.creditorStore.totalCreditors;
  protected readonly loading = this.creditorStore.getPaginatedLoading;
  private readonly currentPage = signal<CreditorFilters>(FIRST_PAGE);

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
      .open<CreateCreditorsComponent, boolean>(CreateCreditorsComponent, {
        title: 'Create New Creditor',
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

  protected edit(creditor: CreditorsEntity): void {
    this.drawer
      .open<UpdateCreditorComponent, boolean, UpdateCreditorData>(UpdateCreditorComponent, {
        title: 'Update Creditor',
        size: 'md',
        data: { creditor },
        injector: this.injector,
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
