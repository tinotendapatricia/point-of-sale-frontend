import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCreditorsUiComponent } from './list-creditors-ui/list-creditors-ui.component';
import { CreditorsFormComponent } from './creditors-form/creditors-form.component';
import { CreditorsDetailsComponent } from './creditors-details/creditors-details.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  plusIcon,
  checkIcon,
} from '@cds/core/icon';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, checkIcon, plusIcon);
@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [
    ListCreditorsUiComponent,
    CreditorsFormComponent,
    CreditorsDetailsComponent,
  ],
  exports: [
    ListCreditorsUiComponent,
    CreditorsFormComponent,
    CreditorsDetailsComponent,
  ],
})
export class CreditorsUiModule {}
