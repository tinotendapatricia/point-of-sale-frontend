import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { Utilities } from '@pos-frontend/shared/utils';

const HIDDEN_FIELDS = new Set(['__v', 'id', 'password', '_id']);

/** Key/value table of the audited resource, hiding internal and sensitive fields. */
@Component({
  selector: 'pos-frontend-audits-details',
  templateUrl: './audits-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KeyValuePipe, TitleCasePipe],
})
export class AuditsDetailsComponent {
  readonly audit = input.required<AuditsEntity>();

  protected readonly fields = computed(() => {
    const resource: Record<string, unknown> = { ...this.audit().resource };
    return Object.fromEntries(Object.entries(resource).filter(([key]) => !HIDDEN_FIELDS.has(key)));
  });

  protected label(key: string): string {
    return Utilities.decamelize(key);
  }

  protected display(value: unknown): string {
    if (value === null || value === undefined) {
      return '--';
    }
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }
}
