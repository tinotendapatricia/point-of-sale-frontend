import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { StockTakeServiceService } from '@pos-frontend/stock-take/data-access';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';

@Component({
    selector: 'pos-frontend-close-batch',
    templateUrl: './close-batch.component.html',
    styleUrls: ['./close-batch.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ActionConfirmationFormComponent]
})
export class CloseBatchComponent implements OnInit  {
@Input() batch :any
@Input() batchNumber!:number
@Output() closeModal = new EventEmitter();

constructor(private stockTakeService: StockTakeServiceService, public productsFacade:ProductsFacade){}

ngOnInit(): void {
  this.productsFacade.getAllProducts()
}

addProductsToStockBatch(){
  this.batch.batchNumber = this.batchNumber
  this.stockTakeService.addProductToStockTakeBatch(this.batch).subscribe({
    next:(res)=>{
      Utilities.displayToast('success',`Your batch number is ${this.batchNumber}`)
    this.closeModal.emit()
    }
  })
}
}
