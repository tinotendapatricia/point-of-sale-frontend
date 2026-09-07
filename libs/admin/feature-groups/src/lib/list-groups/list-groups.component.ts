import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatagridState } from '@pos-frontend/shared/utils';
import { GroupsEntity, GroupsFacade } from '@pos-frontend/groups/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ListGroupsUiComponent } from '@pos-frontend/groups/ui';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-list-groups',
    templateUrl: './list-groups.component.html',
    styleUrls: ['./list-groups.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, ListGroupsUiComponent, AsyncPipe]
})
export class ListGroupsComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public groupsFacade: GroupsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public getGroupList(state: DatagridState) {
    this.groupsFacade.getPaginatedGroups(state);
  }

  refresh() {
    this.getGroupList({});
  }

  createGroup() {
    this.dialog
      .open(CreateGroupComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateGroup(group: GroupsEntity) {
    this.router.navigate(['./update-group', group.id], {
      relativeTo: this.route,
    });
  }

  viewGroup(group: GroupsEntity) {
    this.groupsFacade.getGroup(group.id);
    this.router.navigate(['./group-details', group.id], {
      relativeTo: this.route,
    });
  }

  viewGroupAuthorities(groupId: any) {
    this.router.navigate(['./view-group', groupId], {
      relativeTo: this.route,
    });
  }
}
