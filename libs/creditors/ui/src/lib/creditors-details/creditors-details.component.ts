import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CreditorsEntity } from '@pos-frontend/creditors/data-access';

/** Read-only summary of a creditor. */
@Component({
  selector: 'pos-frontend-creditors-details',
  templateUrl: './creditors-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditorsDetailsComponent {
  readonly creditor = input<CreditorsEntity>();
}
