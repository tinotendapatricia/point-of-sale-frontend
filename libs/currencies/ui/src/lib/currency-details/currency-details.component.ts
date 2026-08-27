import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { Utilities } from '@pos-frontend/shared/utils';

@Component({
    selector: 'pos-frontend-currency-details',
    templateUrl: './currency-details.component.html',
    styleUrls: ['./currency-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CurrencyDetailsComponent {
  @Input() currency!: CurrenciesEntity;

  public decamelize = Utilities.decamelize;
  public nonDisplayableFields = ['deleted', 'id', '__v'];

  public isHide(field: string | undefined) {
    return this.nonDisplayableFields.some((element) => element === field);
  }
}
