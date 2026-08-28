import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { GroupsEntity, GroupsFacade } from '@pos-frontend/groups/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { ListGroupsUiComponent } from '../../../../../groups/ui/src/lib/list-groups-ui/list-groups-ui.component';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-list-groups',
    templateUrl: './list-groups.component.html',
    styleUrls: ['./list-groups.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ClrIcon, ClrIconModule, ListGroupsUiComponent, CreateGroupComponent, AsyncPipe]
})
export class ListGroupsComponent implements OnInit {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedGroup!: GroupsEntity;

  constructor(
    public groupsFacade: GroupsFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  public getGroupList(state: ClrDatagridStateInterface) {
    this.groupsFacade.getPaginatedGroups(state);
  }

  refresh(isRefresh?: boolean) {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getGroupList({}) 
  }

  updateGroup(group: GroupsEntity) {
    this.router.navigate(['./update-group', group.id], {
      relativeTo: this.route,
    });
  }

  viewGroup(group: GroupsEntity) {
    this.groupsFacade.getGroup(group.id)
    this.router.navigate(['./group-details', group.id], {
      relativeTo: this.route,
    });
  }

  changeGroupStatus(group: GroupsEntity) {
    this.selectedGroup = group;
    this.isChangeStatus = true;
  }

  viewGroupAuthorities(groupId: any) {
    this.router.navigate(['./view-group', groupId], {
      relativeTo: this.route,
    });
  }
}
