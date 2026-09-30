import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClrLoadingState } from '@clr/angular';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import {
  type CreateSaleRequest,
  PosFacade,
  getStationNumber,
} from '@pos-frontend/pos/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { PosFormComponent } from '@pos-frontend/pos/ui';

@Component({
  selector: 'pos-frontend-refund-home',
  templateUrl: './refund-home.component.html',
  styleUrl: './refund-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PosFormComponent],
})
export class RefundHomeComponent {
  private readonly productStore = inject(ProductStore);
  private readonly debtorStore = inject(DebtorStore);
  private readonly currencyStore = inject(CurrencyStore);
  private readonly posFacade = inject(PosFacade);

  protected readonly products = this.productStore.products;
  protected readonly debtors = this.debtorStore.debtors;
  protected readonly currency = this.currencyStore.defaultCurrency;
  protected readonly btnState = toSignal(this.posFacade.btnState$, {
    initialValue: ClrLoadingState.DEFAULT,
  });
  protected readonly sale = toSignal(this.posFacade.selectedPos$);
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
    this.posFacade.createNewPos(sale);
  }

  private loadTillData(): void {
    this.productStore.getAllProducts();
    this.debtorStore.getAllDebtors();
    this.currencyStore.getDefaultCurrency();
  }
}
