import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsFormComponent, type CompanyFormValue } from '@pos-frontend/company-details/ui';
import { injectDrawerRef } from '@pos-frontend/core';

/** Drawer content: opened from the company details page. */
@Component({
  selector: 'pos-frontend-create-company-details',
  templateUrl: './create-company-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompanyDetailsFormComponent],
})
export class CreateCompanyDetailsComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly companyStore = inject(CompanyStore);

  protected readonly submitting = this.companyStore.createLoading;

  protected create(value: CompanyFormValue): void {
    this.companyStore.createCompany({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    this.drawerRef.close(created);
  }
}
