import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

import { ProductsEntity, ProductsFacade } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-update-cost',
    templateUrl: './update-cost.component.html',
    styleUrls: ['./update-cost.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UpdateCostComponent implements OnInit {
  @Input() product:ProductsEntity | undefined
  @Output() closeModal = new EventEmitter();
  constructor(
    public productsFacade: ProductsFacade,
 
  ) {}

  ngOnInit(): void {
    // this.creditorsFacade.getAllCreditors();
  }

  public onSubmit(cost: any) {
    this.productsFacade.updateCost(cost);
    this.productsFacade.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
