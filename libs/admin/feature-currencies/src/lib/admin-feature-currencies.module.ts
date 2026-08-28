import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { UpdateCurrencyComponent } from './update-currency/update-currency.component';
import { DeleteCurrencyComponent } from './delete-currency/delete-currency.component';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';

import { MatCardModule } from '@angular/material/card';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { MakeDefaultComponent } from './make-default/make-default.component';

import { UpdateRateComponent } from './update-rate/update-rate.component';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);
@NgModule({
    imports: [
    CommonModule,
    MatCardModule,
    CurrenciesDataAccessModule,
    ClarityModule,
    RouterModule.forChild([{ path: '', component: CurrenciesListComponent }]),
    CurrenciesListComponent,
    CreateCurrencyComponent,
    UpdateCurrencyComponent,
    DeleteCurrencyComponent,
    MakeDefaultComponent,
    UpdateRateComponent,
    UpdateRateComponent,
],
})
export class AdminFeatureCurrenciesModule {}
