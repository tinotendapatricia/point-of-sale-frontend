import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupsEntity } from '@pos-frontend/groups/data-access';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
    selector: 'pos-frontend-list-groups-ui',
    templateUrl: './list-groups-ui.component.html',
    styleUrls: ['./list-groups-ui.component.scss'],
    standalone: false
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
