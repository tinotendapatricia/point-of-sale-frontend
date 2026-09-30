import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { type CompanyEntity, CompanyStore } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsFormComponent, type CompanyFormValue } from '@pos-frontend/company-details/ui';
import { injectDrawerData, injectDrawerRef } from '@pos-frontend/core';

export interface UpdateCompanyDetailsData {
  company: CompanyEntity;
}

/** Drawer content: opened from the company details page with the current record. */
@Component({
  selector: 'pos-frontend-update-company-details',
  templateUrl: './update-company-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompanyDetailsFormComponent],
})
export class UpdateCompanyDetailsComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly companyStore = inject(CompanyStore);

  protected readonly company = injectDrawerData<UpdateCompanyDetailsData>().company;
  protected readonly submitting = this.companyStore.updateLoading;

  protected update(value: CompanyFormValue): void {
    this.companyStore.updateCompany({
      data: { ...value, id: this.company.id },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}
