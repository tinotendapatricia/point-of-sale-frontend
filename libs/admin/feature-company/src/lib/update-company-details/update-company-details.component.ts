import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CompanyEntity, CompanyService } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsFormComponent } from '@pos-frontend/company-details/ui';

@Component({
    selector: 'pos-frontend-update-company-details',
    templateUrl: './update-company-details.component.html',
    styleUrls: ['./update-company-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CompanyDetailsFormComponent]
})
export class UpdateCompanyDetailsComponent {
  @Input() company!:CompanyEntity 
  @Output() closeModal = new EventEmitter();

  constructor(
    public companyService: CompanyService,

  ) {}

  public createCompany(company: any) {
 
    this.companyService.updateCompany(company).subscribe({
      next:(res)=>{this.closeModal.emit(res)}
    });
  }
}
