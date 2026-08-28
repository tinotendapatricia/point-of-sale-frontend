import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'pos-frontend-stock-take-count-form',
    templateUrl: './stock-take-count-form.component.html',
    styleUrls: ['./stock-take-count-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrInputModule, ClrCommonFormsModule, FormsModule]
})
export class StockTakeCountFormComponent implements OnChanges {
  @Output() formValue = new EventEmitter();
  batchNumber!: number;
  @Input() batchProducts: any;
  @Input() products: any;
  @Input() newArray: any[] = [];
  @Output() adjustedStock = new EventEmitter();
  countedStockItems: any[]=[];

  startComparison() {
    this.formValue.emit({ batchNumber: this.batchNumber });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['batchProducts']?.currentValue) {
      console.log('tino2')
      console.log(this.batchProducts)
      console.log(this.products)
      this.batchProducts.forEach((p: any) => {
        this.products.forEach((pro: any) => {
          if (p.productId === pro.id) {
            this.newArray.push({
              productId: p.productId,
              name: pro.name,
              batchCount: p.quantity,
              systemCount: pro.quantity,
              variance: p.quantity - pro.quantity,
            });
            this.countedStockItems.push({
              product: p.productId,
              quantity: p.quantity,
              adjustedOnBatch: p.stockBatch,
            });
          }
        });
      });

    }
  }

  adjustStock() {
    this.adjustedStock.emit(
      { values: this.countedStockItems ,
        batchNumber: this.batchNumber,
        adjustedValues:this.newArray,
      }
    
    );
  }
}
