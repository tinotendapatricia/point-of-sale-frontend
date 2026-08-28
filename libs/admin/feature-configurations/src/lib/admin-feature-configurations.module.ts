import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsListComponent } from './configurations-list/configurations-list.component';
import { CreateConfigurationsComponent } from './create-configurations/create-configurations.component';
import { UpdateConfigurationsComponent } from './update-configurations/update-configurations.component';
import { RouterModule } from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);
@NgModule({
    imports: [CommonModule, RouterModule.forChild([
        { path: '', component: ConfigurationsListComponent }
    ]),
    MatCardModule, ClarityModule, ConfigurationsListComponent,
    CreateConfigurationsComponent,
    UpdateConfigurationsComponent],
})
export class AdminFeatureConfigurationsModule {}
