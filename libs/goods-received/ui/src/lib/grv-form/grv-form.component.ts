import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SumAmount,
  SumArray,
  sumQtyReceived,
  SumQuantity,
  SumReceivedValue,
} from '@pos-frontend/shared/utils';

@Component({
  selector: 'pos-frontend-grv-form',
  templateUrl: './grv-form.component.html',
  styleUrls: ['./grv-form.component.css'],
})
export class GrvFormComponent implements OnChanges {
  form!: FormGroup;
  @Output() formValue = new EventEmitter();
  @Output() getPurchaseOrder = new EventEmitter();
  @Input() order: any;
  today = new Date();
  receivedProducts: any[] = [];
  productToBeSubmitted: any[] = [];
  purchaseOrder!: number;
  dataToBeSubmitted: any[] = [];
  orders: any[] = [];
  totalPurchaseCost = 0;
  reference = '';
  stat = false
  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'].currentValue) {
      this.order.forEach((ele: any) => {
        this.totalPurchaseCost = this.totalPurchaseCost + ele.amount;
        return this.orders.push({
          ...ele,
          qtyReceived: '',
          unitCost: ele.amount / ele.quantity,
          receivedValue: 0,
        });
      });
    }
  }

  submit() {
    this.stat = true
    this.formValue.emit({
      purchaseOrderNumber: this.purchaseOrder,
      products: this.dataToBeSubmitted,
      totalAmount: this.calculateReceivedValue(this.dataToBeSubmitted),
      totalQty: this.calculateQtyReceived(this.dataToBeSubmitted),
      reference: this.reference,
    });
    this.orders = []
    this.dataToBeSubmitted = []
  }

  updateProduct(pro: any, index: number) {
    console.log(pro);
    pro.receivedValue = pro.qtyReceived * pro.unitCost;
    if (this.dataToBeSubmitted.length == 0) {
      this.dataToBeSubmitted.push(pro);
    } else {
      this.dataToBeSubmitted[index] = pro;
    }
  }

  calculateTotal(array: any) {
    const arr = new SumArray(array);
    return arr.sum;
  }

  calculateQuantity(array: any) {
    const arr = new SumQuantity(array);
    return arr.sum;
  }

  calculateQtyReceived(array: any) {
    const arr = new sumQtyReceived(array);
    return arr.sum;
  }

  calculateReceivedValue(array: any) {
    const arr = new SumReceivedValue(array);
    return arr.sum;
  }
}
