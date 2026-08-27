import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CompanyEntity, CompanyService } from '@pos-frontend/company-details/data-access';
import { Observable } from 'rxjs';

@Component({
    selector: 'pos-frontend-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
