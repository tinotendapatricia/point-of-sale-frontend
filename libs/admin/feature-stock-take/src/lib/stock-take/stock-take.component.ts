import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsEntity, ProductsFacade } from '@pos-frontend/products/data-access';
import { StockTakeServiceService } from '@pos-frontend/stock-take/data-access';
import { StockTakeCountFormComponent } from '@pos-frontend/stock-take/ui';
import { StockAdjustmentComponent } from '../stock-adjustment/stock-adjustment.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-stock-take',
    templateUrl: './stock-take.component.html',
    styleUrls: ['./stock-take.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [StockTakeCountFormComponent, StockAdjustmentComponent, AsyncPipe]
})
export class StockTakeComponent   {
  batchProducts:any
  selectedAdjustedStock:any
  isAdjustStock = false


  constructor(public stockTakeService: StockTakeServiceService, public productsFacade:ProductsFacade){}

  initiateStockTake(batchDetails:any){
 console.log("tino")
    this.stockTakeService.getProductsInBatch(batchDetails.batchNumber).subscribe({
      next:(res)=>{
        this.batchProducts = res
        this.productsFacade.getAllProducts()
      }
    })
  }


  adjustStock(details:any){

    this.selectedAdjustedStock = details
    this.isAdjustStock = true

  }



}
