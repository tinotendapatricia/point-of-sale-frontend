import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { type PageEvent } from '@angular/material/paginator';
import { AuditStore, type AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { ListAuditsUiComponent } from '@pos-frontend/audit-trail/ui';
import { DrawerService } from '@pos-frontend/core';
import { AuditDetailsDrawerComponent } from '../audit-details-drawer/audit-details-drawer.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-audits',
  templateUrl: './list-audits.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListAuditsUiComponent],
})
export class ListAuditsComponent {
  private readonly drawer = inject(DrawerService);
  private readonly injector = inject(Injector);
  protected readonly auditStore = inject(AuditStore);

  protected readonly loading = this.auditStore.getPaginatedLoading;
  protected readonly audits = this.auditStore.paginatedAudits;
  protected readonly total = this.auditStore.totalAudits;

  constructor() {
    this.refresh();
  }

  protected onPage(event: PageEvent): void {
    this.auditStore.getPaginatedAudits({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.auditStore.getPaginatedAudits(FIRST_PAGE);
  }

  protected view(audit: AuditsEntity): void {
    this.drawer.open<AuditDetailsDrawerComponent, void, AuditsEntity>(AuditDetailsDrawerComponent, {
      title: audit.name,
      subtitle: `By ${audit.actionedBy}`,
      size: 'md',
      data: audit,
      injector: this.injector,
    });
  }
}
