import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Utilities } from '@pos-frontend/shared/utils';
import type { VatEntity } from '@pos-frontend/vat/data-access';

interface DetailField {
  key: string;
  label: string;
  value: unknown;
}

const HIDDEN_FIELDS = new Set(['deleted', 'id', '__v']);

/** Read-only list of every displayable field on the VAT setting. */
@Component({
  selector: 'pos-frontend-vat-details',
  templateUrl: './vat-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
})
export class VatDetailsComponent {
  readonly vat = input<VatEntity>();

  protected readonly fields = computed<DetailField[]>(() => {
    const vat = this.vat();
    if (!vat) {
      return [];
    }
    return Object.entries(vat)
      .filter(([key]) => !HIDDEN_FIELDS.has(key))
      .map(([key, value]) => ({ key, label: Utilities.decamelize(key), value }));
  });
}
