import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { PosFacade } from '@pos-frontend/pos/data-access';
import {
  ProductsEntity,
  ProductsFacade,
} from '@pos-frontend/products/data-access';
import { VatFacade } from '@pos-frontend/vat/data-access';
import { Observable } from 'rxjs';
import { PosFormComponent } from '@pos-frontend/pos/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-pos-home',
    templateUrl: './pos-home.component.html',
    styleUrls: ['./pos-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PosFormComponent, AsyncPipe],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PosHomeComponent implements OnInit {
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
