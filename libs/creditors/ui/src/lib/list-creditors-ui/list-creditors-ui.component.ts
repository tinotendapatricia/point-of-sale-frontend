import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { CreditorsEntity } from '@pos-frontend/creditors/data-access';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';

@Component({
    selector: 'pos-frontend-list-creditors-ui',
    templateUrl: './list-creditors-ui.component.html',
    styleUrls: ['./list-creditors-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrIcon, ClrIconModule]
})
export class ListCreditorsUiComponent {
  @Input() creditorsList: CreditorsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<CreditorsEntity>();
}
