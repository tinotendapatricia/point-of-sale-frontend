import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, type TemplateRef, computed, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import type { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

/** Presentational configurations table on the shared BmgTable, paginated client-side. */
@Component({
  selector: 'pos-frontend-configurations-list-ui',
  templateUrl: './configurations-list-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, DatePipe, MatButtonModule, MatIconModule],
})
export class ConfigurationsListUiComponent {
  readonly configurations = input.required<ConfigurationsEntity[]>();
  readonly loading = input(false);

  readonly added = output<void>();
  readonly refreshed = output<void>();
  readonly edited = output<ConfigurationsEntity>();

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly createdTpl = viewChild<TemplateRef<unknown>>('createdTpl');

  protected readonly dataSource = computed(() => new MatTableDataSource(this.configurations()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'stationNumber', header: 'Station Number' },
    { key: 'stationName', header: 'Station Name' },
    { key: 'printerName', header: 'Printer Name' },
    { key: 'copies', header: 'Printer Copies' },
    { key: 'createdBy', header: 'Created By' },
    { key: 'createdAt', header: 'Date Created', template: this.createdTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);
}
