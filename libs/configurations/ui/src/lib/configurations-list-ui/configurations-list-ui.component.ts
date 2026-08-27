import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';

@Component({
    selector: 'pos-frontend-configurations-list-ui',
    templateUrl: './configurations-list-ui.component.html',
    styleUrls: ['./configurations-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ConfigurationsListUiComponent {

  @Input() configurationsList: ConfigurationsEntity[] = [];
  @Input() total = 0;
  @Input() loading = false;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<any>();
}
