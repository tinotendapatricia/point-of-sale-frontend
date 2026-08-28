import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CompanyEntity, CompanyService } from '@pos-frontend/company-details/data-access';
import { Observable } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { CompanyDetailsUiComponent } from '@pos-frontend/company-details/ui';
import { CreateCompanyDetailsComponent } from '../create-company-details/create-company-details.component';
import { UpdateCompanyDetailsComponent } from '../update-company-details/update-company-details.component';

@Component({
    selector: 'pos-frontend-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ClrIcon, ClrIconModule, CompanyDetailsUiComponent, CreateCompanyDetailsComponent, UpdateCompanyDetailsComponent]
})
export class CompanyDetailsComponent implements OnInit  {

  isCreate = false;
  isUpdate = false;
  company! :CompanyEntity
  constructor(private companyService: CompanyService){}


  ngOnInit(): void {
   this.getCompany()
  }

  getCompany(){
   this.companyService.getCompany().subscribe({
      next:(res)=>{
        this.company = res
      }
    })
  }

  refresh(){
   
    this.getCompany()
    this.isCreate = false
    this.isUpdate = false
  }
}
