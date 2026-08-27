import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';

@Component({
    selector: 'pos-frontend-debtors-list-ui',
    templateUrl: './debtors-list-ui.component.html',
    styleUrls: ['./debtors-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DebtorsListUiComponent {
  @Input() debtorsList: DebtorsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<any>();
}
