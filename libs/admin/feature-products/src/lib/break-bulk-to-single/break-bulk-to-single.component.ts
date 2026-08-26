import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  ProductsEntity,
  ProductsFacade,
  ProductsService,
} from '@pos-frontend/products/data-access';
import { Utilities } from '@pos-frontend/shared/utils';

@Component({
    selector: 'pos-frontend-break-bulk-to-single',
    templateUrl: './break-bulk-to-single.component.html',
    styleUrls: ['./break-bulk-to-single.component.scss'],
    standalone: false
})
export class BreakBulkToSingleComponent implements AfterViewChecked, OnInit {
  public isUpdate = false;
  public isUpdateCost = false;
  public isUpdatePrice = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedProduct!: ProductsEntity;

  constructor(
    public productsFacade: ProductsFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.getProductList();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getProductList() {
    this.productsFacade.getAllProducts();
  }

  onSubmit(details: any) {
    this.productsService.breakProduct(details).subscribe({
      next: (res) => {
        Utilities.displayToast('success');
      },

    });
  }
}
