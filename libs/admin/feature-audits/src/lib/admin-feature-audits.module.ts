import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { AuditTrailDataAccessModule } from '@pos-frontend/audit-trail/data-access';
import { AuditTrailUiModule } from '@pos-frontend/audit-trail/ui';
import { RouterModule } from '@angular/router';
import { ListAuditsComponent } from './list-audits/list-audits.component';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    AuditTrailDataAccessModule,
    AuditTrailUiModule,
    MatCardModule ,
    RouterModule.forChild([{ path:'', component:ListAuditsComponent }]),
  ],
  declarations: [ListAuditsComponent],
})
export class AdminFeatureAuditsModule {}
