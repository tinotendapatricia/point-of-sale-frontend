import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { StationsEntity } from '@pos-frontend/stations/data-access';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';

@Component({
    selector: 'pos-frontend-stations-list-ui',
    templateUrl: './stations-list-ui.component.html',
    styleUrls: ['./stations-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective]
})
export class StationsListUiComponent {
  @Input() stationsList: StationsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() viewStationPermissions = new EventEmitter<string | number>();
}
