import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { AuditsDetailsComponent } from '@pos-frontend/audit-trail/ui';
import { injectDrawerData } from '@pos-frontend/core';

/** Drawer content: shows one audit record's resource, opened from the audit list. */
@Component({
  selector: 'pos-frontend-audit-details-drawer',
  template: '<pos-frontend-audits-details [audit]="audit" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuditsDetailsComponent],
})
export class AuditDetailsDrawerComponent {
  protected readonly audit = injectDrawerData<AuditsEntity>();
}
