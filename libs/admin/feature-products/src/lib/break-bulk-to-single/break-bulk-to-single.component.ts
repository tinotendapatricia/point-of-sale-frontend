import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  ProductsEntity,
  ProductsFacade,
  ProductsService,
} from '@pos-frontend/products/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { BreakBulkFormComponent } from '@pos-frontend/products/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-break-bulk-to-single',
    templateUrl: './break-bulk-to-single.component.html',
    styleUrls: ['./break-bulk-to-single.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, RouterLinkActive, RouterLink, ClrIcon, ClrIconModule, BreakBulkFormComponent, AsyncPipe]
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
