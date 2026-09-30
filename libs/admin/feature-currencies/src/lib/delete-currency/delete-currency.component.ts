import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Unrouted placeholder; nothing references it. */
@Component({
  selector: 'pos-frontend-delete-currency',
  templateUrl: './delete-currency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCurrencyComponent {}
