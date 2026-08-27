import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ProductsEntity, ProductsFacade } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-update-price',
    templateUrl: './update-price.component.html',
    styleUrls: ['./update-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UpdatePriceComponent {

  @Input() product:ProductsEntity | undefined
  @Output() closeModal = new EventEmitter();
  constructor(
    public productsFacade: ProductsFacade,
 
  ) {}

  ngOnInit(): void {
    // this.creditorsFacade.getAllCreditors();
  }

  public onSubmit(cost: any) {
    this.productsFacade.updatePrice(cost);
    this.productsFacade.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
