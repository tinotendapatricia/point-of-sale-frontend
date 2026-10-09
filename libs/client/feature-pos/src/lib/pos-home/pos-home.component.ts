import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import {
  type CreateSaleRequest,
  PosStore,
  getStationNumber,
} from '@pos-frontend/pos/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { PosFormComponent } from '@pos-frontend/pos/ui';

@Component({
  selector: 'pos-frontend-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrl: './pos-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PosFormComponent],
})
export class PosHomeComponent {
  private readonly productStore = inject(ProductStore);
  private readonly debtorStore = inject(DebtorStore);
  private readonly currencyStore = inject(CurrencyStore);
  private readonly posStore = inject(PosStore);

  protected readonly products = this.productStore.products;
  protected readonly debtors = this.debtorStore.debtors;
  protected readonly currency = this.currencyStore.defaultCurrency;
  protected readonly submitting = this.posStore.createLoading;
  protected readonly sale = this.posStore.pos;
  protected readonly station = getStationNumber();

  constructor() {
    // Load the till data on entry and again after every invoice, so stock
    // levels are fresh for the next customer.
    effect(() => {
      this.sale();
      untracked(() => this.loadTillData());
    });
  }

  protected createSale(sale: CreateSaleRequest): void {
    // The till clears itself when the new invoice lands in the store.
    this.posStore.createPos({ data: sale, callback: () => undefined });
  }

  private loadTillData(): void {
    this.productStore.getAllProducts();
    this.debtorStore.getAllDebtors();
    this.currencyStore.getDefaultCurrency();
  }
}
