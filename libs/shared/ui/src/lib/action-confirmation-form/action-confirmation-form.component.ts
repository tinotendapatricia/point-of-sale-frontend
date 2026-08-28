import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-action-confirmation-form',
    templateUrl: './action-confirmation-form.component.html',
    styleUrls: ['./action-confirmation-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class ActionConfirmationFormComponent {
  @Input() btnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  @Input() message = '';
  @Input() title = '';
  @Output() proceed = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  public opened = true;

  constructor() {}
}
