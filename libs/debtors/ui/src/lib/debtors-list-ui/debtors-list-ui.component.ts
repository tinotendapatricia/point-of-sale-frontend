import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';

@Component({
    selector: 'pos-frontend-debtors-list-ui',
    templateUrl: './debtors-list-ui.component.html',
    styleUrls: ['./debtors-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrIcon, ClrIconModule]
})
export class DebtorsListUiComponent {
  @Input() debtorsList: DebtorsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<any>();
}
