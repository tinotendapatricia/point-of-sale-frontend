import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { CreditorsEntity } from '@pos-frontend/creditors/data-access';

@Component({
  selector: 'pos-frontend-list-creditors-ui',
  templateUrl: './list-creditors-ui.component.html',
  styleUrls: ['./list-creditors-ui.component.scss'],
})
export class ListCreditorsUiComponent {
  @Input() creditorsList: CreditorsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<CreditorsEntity>();
}
