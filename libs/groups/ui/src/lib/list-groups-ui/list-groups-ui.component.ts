import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GroupsEntity } from '@pos-frontend/groups/data-access';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';

@Component({
    selector: 'pos-frontend-list-groups-ui',
    templateUrl: './list-groups-ui.component.html',
    styleUrls: ['./list-groups-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective]
})
export class ListGroupsUiComponent implements OnInit {
  @Input() groupsList: GroupsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() viewGroupPermissions = new EventEmitter<string | number>();

  constructor() {}

  ngOnInit(): void {}
}
