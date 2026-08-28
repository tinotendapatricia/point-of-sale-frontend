import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedUtilsModule } from '@pos-frontend/shared/utils';
import { NgSelectModule } from '@ng-select/ng-select';
import '@cds/core/icon/register.js';
import { ClarityIcons, minusCircleIcon, pencilIcon } from '@cds/core/icon';
ClarityIcons.addIcons(pencilIcon, minusCircleIcon);

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        // SharedUtilsModule,
        NgSelectModule,
        PurchaseOrderFormComponent,
    ],
    exports: [PurchaseOrderFormComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PurchaseOrdersUiModule {}
