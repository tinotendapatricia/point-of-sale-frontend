import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ProductsEntity } from '@pos-frontend/products/data-access';
import { VatEntity } from '@pos-frontend/vat/data-access';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { ClrLoadingState } from '@clr/angular';
import { PosEntity } from '@pos-frontend/pos/data-access';
import { SumTotalAmount } from '@pos-frontend/shared/utils';

@Component({
  selector: 'pos-frontend-pos-form',
  templateUrl: './pos-form.component.html',
  styleUrls: ['./pos-form.component.scss'],
})
export class PosFormComponent implements OnInit, OnChanges {
  @Input() btnState!: ClrLoadingState;
  @Input() products: ProductsEntity[] = [];
  @Input() debtors!: DebtorsEntity[];
  @Input() isRefund = false;
  @Input() isSale = false;
  @Input() vat!: VatEntity;
  @Input() currency!: CurrenciesEntity;
  @Input() sale!: PosEntity;
  opened = false;
  rate!: number;
  @Output() formValue = new EventEmitter();
  totalAmt = 0;
  amountToBePaid = 0;
  totalVat = 0;
  form = new UntypedFormGroup({});
  changeForm = new UntypedFormGroup({});
  selectedProducts: any[] = [];
  quantity = 0;
  debtorId = '';
  err!: string;
  dis = false;
  change = 0;
  changeRate = 0;
  changeDebtor: any;
  isChange = false;

  constructor(private config: NgSelectConfig, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      totalAmount: '',
      vatAmount: '',
      items: this.fb.array([]),
      code: '',
      quantity: '',
      cost: '',
      reference:''
    });

    this.changeForm = this.fb.group({
      amountOffered: '',
      changeDebtor: '',
      changeAmount: 0,
      costOfGoods: [''],
      foreignDebtor: [''],
    });
    this.changeForm.get('changeDebtor')?.valueChanges.subscribe((data) => {
      this.changeDebtor = this.debtors.find((deb) => deb.id == data);
      console.log(this.changeDebtor);
    });
  }

  onSubmit() {
    if (this.form.get('code')?.value) {
      const m = this.products.find(
        (pro) => pro.code === this.form.get('code')?.value
      );

      this.selectedProducts.push({
        code: m?.code,
        description: m?.name,
        productId: m?.id,
        quantity: this.form.get('quantity')?.value
          ? this.form.get('quantity')?.value
          : 1,
        price: m?.price[0].value,
        cost: m?.cost[0].value,
        totalAmt:
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
          m?.price[0].value! *
          (this.form.get('quantity')?.value
            ? this.form.get('quantity')?.value
            : 1),
      });

      this.form.reset();
    }
  }

  log(n: any) {}

  convertPrice() {
    const m = this.debtors.find((el) => el.id === this.debtorId);
    this.rate = m?.currency.rate[0].value;
  }

  cancelTransaction() {
    //this.selectedProducts?.length = 0;
    this.selectedProducts = [];
    this.totalAmt = 0;
    this.amountToBePaid = 0;
    this.debtorId = '';
  }

  remove(index: number, product: any) {
    this.selectedProducts.splice(index, 1);
    console.log(this.selectedProducts);
    //this.totalAmt = this.totalAmt - product.price;
    //this.totalVat = this.totalVat - (this.vat.vat / 100) * this.totalAmt;
  }

  processReceipt() {
    console.log(this.debtorId);
    this.changeForm.get('amountOfGoods')?.disable;
    if (this.debtorId) {
      this.formValue.emit({
        products: this.selectedProducts,
        totalAmountExcVat: this.calculateTotalAmount(),
        totalVat: this.totalVat,
        total: this.calculateTotalAmount() + this.totalVat,
        debtor: this.debtorId,
        station: localStorage.getItem('station'),
        rate: this.rate,
        transactionType:this.isRefund ? 2 : 1,
        reference: this.form.get('reference')?.value,
        changeDebtor: this.changeForm.get('foreignDebtor')?.value
          ? this.changeForm.get('changeDebtor')?.value
          : null,
        changeRate: this.changeDebtor
          ? this.changeDebtor.currency.rate[0].value
          : null,
        changeAmount: this.changeDebtor
          ? (this.change - this.calculateTotalAmount() * this.rate) *
            this.changeDebtor?.currency?.rate[0]?.value
          : null,
      });
      this.rate = 0;
      this.totalAmt = 0;
      this.amountToBePaid = 0;
      this.totalVat = 0;
      this.selectedProducts = [];
      this.quantity = 0;
      this.debtorId = '';
      this.opened = false;
    } else {
      this.err = 'Select Debtor Account';
    }
  }

  isDisabled(): boolean {
    if (this.selectedProducts.length <= 0 || this.err) {
      return this.dis;
    }
    return this.dis;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sale']?.currentValue) {
      this.cancelTransaction();
    }
  }

  calculateTotalAmount() {
    const arr = new SumTotalAmount(this.selectedProducts);
    return arr.sum;
  }

  calculateChange() {
    this.change = +this.changeForm.get('amountOffered')?.value;
  }

  selectedDebtor(debtor: any) {
    console.log(debtor);
  }

  processChange() {
    console.log(this.changeForm.value);
  }

  initChange() {
    this.opened = true;
    this.changeForm
      .get('costOfGoods')
      ?.patchValue(this.calculateTotalAmount() * this.rate);
  }


  increaseQuantity(indexOfItem:any){
    this.selectedProducts.at(indexOfItem).quantity = this.selectedProducts.at(indexOfItem).quantity+1
  }

  decreaseQuantity(indexOfItem:any){
    this.selectedProducts.at(indexOfItem).quantity = this.selectedProducts.at(indexOfItem).quantity-1
  }
}
