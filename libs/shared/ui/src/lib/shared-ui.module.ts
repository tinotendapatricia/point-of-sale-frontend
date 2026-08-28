import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmationFormComponent } from './/action-confirmation-form/action-confirmation-form.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClarityModule, ActionConfirmationFormComponent],
    exports: [ActionConfirmationFormComponent],
})
export class SharedUiModule {}
