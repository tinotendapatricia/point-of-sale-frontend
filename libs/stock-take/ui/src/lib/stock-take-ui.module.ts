import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockTakeFormComponent } from './stock-take-form/stock-take-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockTakeCountFormComponent } from './stock-take-count-form/stock-take-count-form.component';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  syncIcon,
  trashIcon
} from '@cds/core/icon';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, trashIcon);
@NgModule({
  imports: [CommonModule, NgSelectModule, ClarityModule, ReactiveFormsModule, FormsModule],
  declarations: [StockTakeFormComponent, StockTakeCountFormComponent],
  exports: [StockTakeFormComponent, StockTakeCountFormComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class StockTakeUiModule {}
