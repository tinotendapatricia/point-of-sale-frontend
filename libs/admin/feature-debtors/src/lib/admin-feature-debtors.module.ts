import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDebtorsComponent } from './list-debtors/list-debtors.component';
import { CreateDebtorsComponent } from './create-debtors/create-debtors.component';
import { UpdateDebtorsComponent } from './/update-debtors/update-debtors.component';
import { DebtorsDataAccessModule } from '@pos-frontend/debtors/data-access';

import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ClarityModule } from '@clr/angular';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';
ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);
@NgModule({
    imports: [
    CommonModule,
    DebtorsDataAccessModule,
    MatCardModule,
    ClarityModule,
    CurrenciesDataAccessModule,
    RouterModule.forChild([{ path: '', component: ListDebtorsComponent }]),
    ListDebtorsComponent,
    CreateDebtorsComponent,
    UpdateDebtorsComponent,
],
})
export class AdminFeatureDebtorsModule {}
