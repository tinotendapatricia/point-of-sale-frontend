import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CompanyEntity } from '@pos-frontend/company-details/data-access';

@Component({
    selector: 'pos-frontend-company-details-ui',
    templateUrl: './company-details-ui.component.html',
    styleUrls: ['./company-details-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class CompanyDetailsUiComponent {
  @Input() company!: CompanyEntity;
}
