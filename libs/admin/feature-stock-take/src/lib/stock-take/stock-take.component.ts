import { Component, OnInit } from '@angular/core';
import { ProductsEntity, ProductsFacade } from '@pos-frontend/products/data-access';
import { StockTakeServiceService } from '@pos-frontend/stock-take/data-access';

@Component({
    selector: 'pos-frontend-stock-take',
    templateUrl: './stock-take.component.html',
    styleUrls: ['./stock-take.component.scss'],
    standalone: false
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
