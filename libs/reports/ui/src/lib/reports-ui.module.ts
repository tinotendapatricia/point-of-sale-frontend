import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsFormComponent } from './reports-form/reports-form.component';
import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {} from '@angular/compiler';
import { CashupFormComponent } from './cashup-form/cashup-form.component';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        ReportsFormComponent, CashupFormComponent,
    ],
    exports: [ReportsFormComponent, CashupFormComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ReportsUiModule {}
