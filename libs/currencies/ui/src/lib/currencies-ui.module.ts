import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormComponent } from './/currency-form/currency-form.component';
import { CurrenciesListUiComponent } from './currencies-list-ui/currencies-list-ui.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
} from '@cds/core/icon';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { RateFormComponent } from './rate-form/rate-form.component';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon);
@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, FormsModule],
  declarations: [
    CurrencyFormComponent,
    CurrenciesListUiComponent,
    CurrencyDetailsComponent,
    RateFormComponent,
  ],
  exports: [
    CurrencyFormComponent,
    CurrenciesListUiComponent,
    CurrencyDetailsComponent,
    RateFormComponent,
    RateFormComponent,
  ],
})
export class CurrenciesUiModule {}
