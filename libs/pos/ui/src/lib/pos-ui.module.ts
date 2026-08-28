import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosFormComponent } from './pos-form/pos-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, NgSelectModule, ClarityModule, FormsModule, ReactiveFormsModule, RouterModule, PosFormComponent],
    exports: [PosFormComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PosUiModule {}
