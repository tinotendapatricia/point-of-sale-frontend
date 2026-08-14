import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsFormComponent } from './company-details-form/company-details-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailsUiComponent } from './company-details-ui/company-details-ui.component';
import { LicenseFormComponent } from './license-form/license-form.component';

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [
    CompanyDetailsFormComponent,
    CompanyDetailsUiComponent,
    LicenseFormComponent,
  ],
  exports: [
    CompanyDetailsFormComponent,
    CompanyDetailsUiComponent,
    LicenseFormComponent,
  ],
})
export class CompanyDetailsUiModule {}
