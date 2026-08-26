import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { StationsEntity } from '@pos-frontend/stations/data-access';

@Component({
    selector: 'pos-frontend-stations-list-ui',
    templateUrl: './stations-list-ui.component.html',
    styleUrls: ['./stations-list-ui.component.scss'],
    standalone: false
})
export class StationsListUiComponent {
  @Input() stationsList: StationsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() viewStationPermissions = new EventEmitter<string | number>();
}
