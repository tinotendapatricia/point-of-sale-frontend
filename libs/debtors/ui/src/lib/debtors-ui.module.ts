import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtorsListUiComponent } from './debtors-list-ui/debtors-list-ui.component';
import { DebtorsFormComponent } from './debtors-form/debtors-form.component';
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
  declarations: [DebtorsListUiComponent, DebtorsFormComponent],
  exports: [DebtorsListUiComponent, DebtorsFormComponent],
})
export class DebtorsUiModule {}
