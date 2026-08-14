import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { StockTakeServiceService } from '@pos-frontend/stock-take/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pos-frontend-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.css'],
})
export class StockAdjustmentComponent implements OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Input() stockToBeAdjusted: any;

  sub = new Subscription()
  constructor(
    public stockTakeService: StockTakeServiceService,
    public productsFacade: ProductsFacade,
    private router:Router
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  adjustStock() {
   this.sub = this.stockTakeService
      .adjustStock(this.stockToBeAdjusted)
      .subscribe((res) => {
        this.router.navigate(['/dashboard'])
        Utilities.displayToast('success',`Success. Stock Adjustment Number: ${res.adjustment.number}`);
        this.closeModal.emit(true);

      });
  }
}
