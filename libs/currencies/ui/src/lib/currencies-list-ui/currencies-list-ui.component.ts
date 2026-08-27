import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-currencies-list-ui',
    templateUrl: './currencies-list-ui.component.html',
    styleUrls: ['./currencies-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CurrenciesListUiComponent {
  @Input() currenciesList: CurrenciesEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<CurrenciesEntity>();
  @Output() viewCurrencyPermissions = new EventEmitter<string | number>();
  @Output() makeDefault = new EventEmitter<CurrenciesEntity>();
  @Output() updateRate = new EventEmitter<CurrenciesEntity>(); 
}
