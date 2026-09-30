import { type Routes } from '@angular/router';
import { ListAuditsComponent } from './list-audits/list-audits.component';

// AuditStore is root-provided, so no route-level providers are needed.
export const ADMIN_FEATURE_AUDITS_ROUTES: Routes = [{ path: '', component: ListAuditsComponent }];
