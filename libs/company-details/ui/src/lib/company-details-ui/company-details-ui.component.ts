import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CompanyEntity } from '@pos-frontend/company-details/data-access';

/** Read-only summary of the company record. */
@Component({
  selector: 'pos-frontend-company-details-ui',
  templateUrl: './company-details-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailsUiComponent {
  readonly company = input<CompanyEntity>();

  protected readonly rows = computed(() => {
    const company = this.company();
    return [
      { label: 'Name', value: company?.name },
      { label: 'Email', value: company?.email },
      { label: 'BP Number', value: company?.bpNumber },
      { label: 'Address', value: company?.address },
      { label: 'Tin', value: company?.tinNumber },
      { label: 'Contact', value: company?.phone },
    ];
  });
}
