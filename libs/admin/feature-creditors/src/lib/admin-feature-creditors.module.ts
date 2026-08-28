import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCreditorsComponent } from './list-creditors/list-creditors.component';
import { CreateCreditorsComponent } from './create-creditors/create-creditors.component';
import { ClarityModule } from '@clr/angular';
import { MatCardModule } from '@angular/material/card';
import { CreditorsDataAccessModule } from '@pos-frontend/creditors/data-access';

import { RouterModule } from '@angular/router';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { UpdateCreditorComponent } from './update-creditor/update-creditor.component';
ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);
@NgModule({
    imports: [
    CommonModule,
    ClarityModule,
    MatCardModule,
    CreditorsDataAccessModule,
    RouterModule.forChild([{ path: '', component: ListCreditorsComponent }]),
    ListCreditorsComponent,
    CreateCreditorsComponent,
    UpdateCreditorComponent,
],
    exports: [UpdateCreditorComponent],
})
export class AdminFeatureCreditorsModule {}
