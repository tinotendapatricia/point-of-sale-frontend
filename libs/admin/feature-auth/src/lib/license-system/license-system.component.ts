import { Component, EventEmitter, Output } from '@angular/core';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { Utilities } from '@pos-frontend/shared/utils';

@Component({
    selector: 'pos-frontend-license-system',
    templateUrl: './license-system.component.html',
    styleUrls: ['./license-system.component.scss'],
    standalone: false
})
export class LicenseSystemComponent {

  @Output() closeModal = new EventEmitter();

  constructor( private companyService: CompanyService){}

  
  license(licenseDetails:any): void {
    this.companyService.licenseSystem(licenseDetails).subscribe({
      next:(res)=>{
        Utilities.displayToast('info', 'License applied thank you for licensing the system')
        this.closeModal.emit(true);
      }
    })
  }
}
