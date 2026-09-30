import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, type TemplateRef, computed, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import type { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

/** Presentational audit-trail table on the shared BmgTable, server-side paginated. */
@Component({
  selector: 'pos-frontend-list-audits-ui',
  templateUrl: './list-audits-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, DatePipe, MatButtonModule, MatIconModule],
})
export class ListAuditsUiComponent {
  readonly audits = input.required<AuditsEntity[]>();
  readonly total = input(0);
  readonly loading = input(false);

  readonly page = output<PageEvent>();
  readonly refreshed = output<void>();
  readonly viewed = output<AuditsEntity>();

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly createdTpl = viewChild<TemplateRef<unknown>>('createdTpl');

  protected readonly dataSource = computed(() => new MatTableDataSource(this.audits()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'name', header: 'Action' },
    { key: 'actionedBy', header: 'Actioned By' },
    { key: 'createdAt', header: 'Date Created', template: this.createdTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);
}
