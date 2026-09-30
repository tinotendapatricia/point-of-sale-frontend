import { ChangeDetectionStrategy, Component, type TemplateRef, computed, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import type { StationsEntity } from '@pos-frontend/stations/data-access';

/** Presentational stations table on the shared BmgTable, server-side paginated. */
@Component({
  selector: 'pos-frontend-stations-list-ui',
  templateUrl: './stations-list-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class StationsListUiComponent {
  readonly stations = input.required<StationsEntity[]>();
  readonly total = input(0);
  readonly loading = input(false);

  readonly page = output<PageEvent>();
  readonly added = output<void>();
  readonly refreshed = output<void>();
  readonly edited = output<string | number>();

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly dataSource = computed(() => new MatTableDataSource(this.stations()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'number', header: 'Account' },
    { key: 'name', header: 'Name' },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);
}
