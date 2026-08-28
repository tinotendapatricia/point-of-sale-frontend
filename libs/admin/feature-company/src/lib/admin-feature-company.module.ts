import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CreateCompanyDetailsComponent } from './create-company-details/create-company-details.component';
import { UpdateCompanyDetailsComponent } from './update-company-details/update-company-details.component';


import { RouterModule } from '@angular/router';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { MatCardModule } from '@angular/material/card';
import { ClarityModule } from '@clr/angular';
ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

@NgModule({
    imports: [CommonModule,
    MatCardModule,
    ClarityModule,
    RouterModule.forChild([
        { path: '', component: CompanyDetailsComponent }
    ]),
    CompanyDetailsComponent,
    CreateCompanyDetailsComponent,
    UpdateCompanyDetailsComponent],
})
export class AdminFeatureCompanyModule {}
