import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { type ConfigurationsEntity, ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { ConfigurationsListUiComponent } from '@pos-frontend/configurations/ui';
import { DrawerService } from '@pos-frontend/core';
import { CreateConfigurationsComponent } from '../create-configurations/create-configurations.component';
import {
  type UpdateConfigurationsData,
  UpdateConfigurationsComponent,
} from '../update-configurations/update-configurations.component';

@Component({
  selector: 'pos-frontend-configurations-list',
  templateUrl: './configurations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfigurationsListUiComponent],
})
export class ConfigurationsListComponent {
  private readonly drawer = inject(DrawerService);
  private readonly injector = inject(Injector);
  protected readonly configurationStore = inject(ConfigurationStore);

  protected readonly loading = this.configurationStore.getManyLoading;
  protected readonly configurations = this.configurationStore.configurations;

  constructor() {
    this.refresh();
  }

  protected refresh(): void {
    this.configurationStore.getAllConfigurations();
  }

  protected add(): void {
    this.drawer
      .open<CreateConfigurationsComponent, boolean>(CreateConfigurationsComponent, {
        title: 'New Configuration',
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

  protected edit(configuration: ConfigurationsEntity): void {
    this.drawer
      .open<UpdateConfigurationsComponent, boolean, UpdateConfigurationsData>(UpdateConfigurationsComponent, {
        title: 'Update Configuration',
        size: 'md',
        data: { configuration },
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }
}
