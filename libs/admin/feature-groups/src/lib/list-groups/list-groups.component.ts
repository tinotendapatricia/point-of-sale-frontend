import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '@pos-frontend/core';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { ListGroupsUiComponent } from '@pos-frontend/groups/ui';

import { CreateGroupComponent } from '../create-group/create-group.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-groups',
  templateUrl: './list-groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, ListGroupsUiComponent],
})
export class ListGroupsComponent {
  private readonly injector = inject(Injector);
  private readonly drawer = inject(DrawerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly groupStore = inject(GroupStore);

  protected readonly groups = this.groupStore.paginatedGroups;
  protected readonly total = this.groupStore.totalGroups;
  protected readonly loading = this.groupStore.getPaginatedLoading;

  constructor() {
    this.refresh();
  }

  protected onPage(event: PageEvent): void {
    this.groupStore.getPaginatedGroups({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.groupStore.getPaginatedGroups(FIRST_PAGE);
  }

  protected createGroup(): void {
    this.drawer
      .open<CreateGroupComponent, boolean>(CreateGroupComponent, {
        title: 'Create New Group',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.refresh();
        }
      });
  }

  protected viewGroupAuthorities(groupId: string | number): void {
    void this.router.navigate(['./view-group', groupId], { relativeTo: this.route });
  }
}
