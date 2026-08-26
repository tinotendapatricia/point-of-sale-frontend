import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { StockTakeServiceService } from '@pos-frontend/stock-take/data-access';

@Component({
    selector: 'pos-frontend-create-stock-batch',
    templateUrl: './create-stock-batch.component.html',
    styleUrls: ['./create-stock-batch.component.scss'],
    standalone: false
})
export class CreateStockBatchComponent implements OnInit  {

  batchNumber!:number|null 
  isCloseBatch = false
  selectedBatch!:any

  constructor(private stockTakeService: StockTakeServiceService, public productsFacade:ProductsFacade){}

  ngOnInit(): void {
    this.productsFacade.getAllProducts()
  }


  initiateBatch(): void {
    this.stockTakeService.createStockTakeBatch().subscribe({
      next:(res)=>{
        this.batchNumber = res.batchNumber
      }
    })
  }

  isAddProductsToStockBatch(batchDetail:any){
    this.selectedBatch = batchDetail
    this.isCloseBatch = true
    
  }

  close(){
    this.batchNumber=null
    this.isCloseBatch = false

  }


}
