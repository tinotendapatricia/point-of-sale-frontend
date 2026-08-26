import { Component, EventEmitter, Output } from '@angular/core';
import { CompanyService } from '@pos-frontend/company-details/data-access';

@Component({
    selector: 'pos-frontend-create-company-details',
    templateUrl: './create-company-details.component.html',
    styleUrls: ['./create-company-details.component.scss'],
    standalone: false
})
export class CreateCompanyDetailsComponent  {

  @Output() closeModal = new EventEmitter();
  constructor(
    public companyService: CompanyService,

  ) {}

 

  public createCompany(company: any) {

    this.companyService.createCompany(company).subscribe({
      next:(res)=>{
        this.closeModal.emit(true)
        }
    });
  }
}
