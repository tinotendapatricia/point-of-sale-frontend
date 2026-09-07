import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CompanyEntity, CompanyService } from '@pos-frontend/company-details/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetailsUiComponent } from '@pos-frontend/company-details/ui';
import { CreateCompanyDetailsComponent } from '../create-company-details/create-company-details.component';
import { UpdateCompanyDetailsComponent } from '../update-company-details/update-company-details.component';

@Component({
    selector: 'pos-frontend-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, CompanyDetailsUiComponent]
})
export class CompanyDetailsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  company!: CompanyEntity;
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    this.companyService.getCompany().subscribe({
      next: (res) => {
        this.company = res;
      },
    });
  }

  create() {
    this.dialog
      .open(CreateCompanyDetailsComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.getCompany());
  }

  update() {
    this.dialog
      .open(UpdateCompanyDetailsComponent, { width: '480px', data: { company: this.company } })
      .afterClosed()
      .subscribe((updated) => updated && this.getCompany());
  }
}
