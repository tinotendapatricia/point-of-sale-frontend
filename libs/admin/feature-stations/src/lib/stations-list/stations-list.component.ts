import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { type StationFilters, type StationsEntity, StationStore } from '@pos-frontend/stations/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

import { type CreateStationData, CreateStationComponent } from '../create-station/create-station.component';

const FIRST_PAGE: StationFilters = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-stations-list',
  templateUrl: './stations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class StationsListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly stationStore = inject(StationStore);

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly currentPage = signal<StationFilters>(FIRST_PAGE);

  protected readonly total = this.stationStore.totalStations;
  protected readonly loading = this.stationStore.getPaginatedLoading;
  protected readonly dataSource = computed(() => new MatTableDataSource(this.stationStore.paginatedStations()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'number', header: 'Account' },
    { key: 'name', header: 'Name' },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.load(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.load({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.load(this.currentPage());
  }

  protected add(): void {
    this.dialog
      .open<CreateStationComponent, CreateStationData, boolean>(CreateStationComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.load(FIRST_PAGE);
        }
      });
  }

  protected edit(station: StationsEntity): void {
    this.dialog
      .open<CreateStationComponent, CreateStationData, boolean>(CreateStationComponent, {
        width: '480px',
        data: { station },
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }

  private load(filters: StationFilters): void {
    this.currentPage.set(filters);
    this.stationStore.getPaginatedStations(filters);
  }
}
