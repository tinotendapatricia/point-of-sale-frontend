import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatFormComponent } from './vat-form/vat-form.component';
import { VatDetailsComponent } from './vat-details/vat-details.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [VatFormComponent, VatFormComponent, VatDetailsComponent],
  exports: [VatFormComponent, VatFormComponent, VatDetailsComponent],
})
export class VatUiModule {}
