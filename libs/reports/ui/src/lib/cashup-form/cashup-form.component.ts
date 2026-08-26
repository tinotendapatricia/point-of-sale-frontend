import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { CashupEntity } from '@pos-frontend/reports/data-access';
import { SumArray } from '@pos-frontend/shared/utils';

@Component({
    selector: 'pos-frontend-cashup-form',
    templateUrl: './cashup-form.component.html',
    styleUrls: ['./cashup-form.component.scss'],
    standalone: false
})
export class CashupFormComponent implements OnChanges {
  @Output() formValue = new EventEmitter();
  @Input() currencies: CurrenciesEntity[] = [];
  @Input() tills!: any[];
  printCashup = false;
  buttonName = 'Print Previous Cashup';
  station!: string;

  n: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currencies']?.currentValue) {
      this.currencies.forEach((currency) =>
        this.n?.push({
          code: currency.code,
          denominations: [
            {
              type: 'Cash ',
              value: 0,
            },
            {
              type: 'Card',
              value: 0,
            },
          ],
          total: 0,
        })
      );
    }
  }

  submit() {
    console.log(this.n);
    const arr: { code: any; total: number }[] = [];
    this.n.forEach((m) => {
      arr.push({
        code: m.code,
        total: this.calculateTotal(m.denominations),
      });
    });
    console.log(arr);
    const splitString = this.station.split('/');
    console.log(splitString)
    this.formValue.emit({
      cashup: arr,
      station: splitString[0],
      tDate: splitString[1],
    });
  }

  togglePrintAngGenerate() {
    this.printCashup = !this.printCashup;
  }

  calculateTotal(array: any) {
    const arr = new SumArray(array);
    return arr.sum;
  }
}
