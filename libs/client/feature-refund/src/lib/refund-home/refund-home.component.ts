import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { PosFacade } from '@pos-frontend/pos/data-access';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { VatFacade } from '@pos-frontend/vat/data-access';

@Component({
  selector: 'pos-frontend-refund-home',
  templateUrl: './refund-home.component.html',
  styleUrls: ['./refund-home.component.scss'],
})
export class RefundHomeComponent  implements OnInit {

  constructor(
    public productsFacade: ProductsFacade,
    public debtorsFacade: DebtorsFacade,
    public vatFacade: VatFacade,
    public currenciesFacade: CurrenciesFacade,
    public posFacade: PosFacade,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productsFacade.getAllProducts();
    this.debtorsFacade.getAllDebtors();
    //this.vatFacade.getVat();
    this.currenciesFacade.getDefaultCurrency();
    
  }

  createSale(posDetails: any) {
    console.log(posDetails)
    this.posFacade.createNewPos(posDetails);
    this.posFacade.loaded$.subscribe({
      next:(res)=>{
        this.ngOnInit()
      }
    })
  }
}
