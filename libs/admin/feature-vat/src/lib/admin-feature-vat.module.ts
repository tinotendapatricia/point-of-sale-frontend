import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVatComponent } from './view-vat/view-vat.component';
import { UpdateVatComponent } from './update-vat/update-vat.component';
import { VatDataAccessModule } from '@pos-frontend/vat/data-access';
import { VatUiModule } from '@pos-frontend/vat/ui';
import { RouterModule } from '@angular/router';
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

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);
@NgModule({
    imports: [
        CommonModule,
        VatDataAccessModule,
        VatUiModule,
        MatCardModule,
        ClarityModule,
        RouterModule.forChild([{ path: '', component: ViewVatComponent }]),
        ViewVatComponent, UpdateVatComponent,
    ],
})
export class AdminFeatureVatModule {}
