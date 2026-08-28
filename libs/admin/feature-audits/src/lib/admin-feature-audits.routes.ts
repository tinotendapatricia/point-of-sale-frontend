import { Routes } from '@angular/router';
import { ListAuditsComponent } from './list-audits/list-audits.component';
import { provideAuditTrailDataAccess } from '@pos-frontend/audit-trail/data-access';

export const ADMIN_FEATURE_AUDITS_ROUTES: Routes = [
  {
    path: '',
    component: ListAuditsComponent,
    providers: [provideAuditTrailDataAccess()],
  },
];
