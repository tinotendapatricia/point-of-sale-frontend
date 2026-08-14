import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompanyEntity, CompanyService } from '@pos-frontend/company-details/data-access';

@Component({
  selector: 'pos-frontend-update-company-details',
  templateUrl: './update-company-details.component.html',
  styleUrls: ['./update-company-details.component.scss'],
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
