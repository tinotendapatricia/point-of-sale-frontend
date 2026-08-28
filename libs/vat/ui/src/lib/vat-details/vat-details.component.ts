import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Utilities } from '@pos-frontend/shared/utils';
import { VatEntity } from '@pos-frontend/vat/data-access';
import { TitleCasePipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-vat-details',
    templateUrl: './vat-details.component.html',
    styleUrls: ['./vat-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TitleCasePipe, KeyValuePipe]
})
export class VatDetailsComponent {
  @Input() vat!: VatEntity;

  public decamelize = Utilities.decamelize;
  public nonDisplayableFields = ['deleted', 'id', '__v'];

  public isHide(field: string | undefined) {
    return this.nonDisplayableFields.some((element) => element === field);
  }
}
