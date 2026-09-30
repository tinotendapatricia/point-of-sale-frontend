import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { type PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '@pos-frontend/core';
import { StationStore } from '@pos-frontend/stations/data-access';
import { StationsListUiComponent } from '@pos-frontend/stations/ui';
import { CreateStationComponent } from '../create-station/create-station.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-stations-list',
  templateUrl: './stations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StationsListUiComponent],
})
export class StationsListComponent {
  private readonly drawer = inject(DrawerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  protected readonly stationStore = inject(StationStore);

  protected readonly loading = this.stationStore.getPaginatedLoading;
  protected readonly stations = this.stationStore.paginatedStations;
  protected readonly total = this.stationStore.totalStations;

  constructor() {
    this.refresh();
  }

  protected onPage(event: PageEvent): void {
    this.stationStore.getPaginatedStations({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.stationStore.getPaginatedStations(FIRST_PAGE);
  }

  protected add(): void {
    this.drawer
      .open<CreateStationComponent, boolean>(CreateStationComponent, {
        title: 'New Station',
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

  protected edit(id: string | number): void {
    void this.router.navigate(['./update', id], { relativeTo: this.route });
  }
}
