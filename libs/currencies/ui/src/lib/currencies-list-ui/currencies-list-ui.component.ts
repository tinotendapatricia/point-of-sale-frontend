import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { CurrencyDetailsComponent } from '../currency-details/currency-details.component';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-currencies-list-ui',
    templateUrl: './currencies-list-ui.component.html',
    styleUrls: ['./currencies-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrIcon, ClrIconModule, CurrencyDetailsComponent, CurrencyPipe]
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
