import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  type ConfigurationsEntity,
  ConfigurationStore,
} from '@pos-frontend/configurations/data-access';
import { ConfigurationsListUiComponent } from '@pos-frontend/configurations/ui';
import {
  CreateConfigurationsComponent,
  type CreateConfigurationsData,
} from '../create-configurations/create-configurations.component';

@Component({
  selector: 'pos-frontend-configurations-list',
  templateUrl: './configurations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfigurationsListUiComponent],
})
export class ConfigurationsListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly loading = this.configurationStore.getManyLoading;
  protected readonly configurations = this.configurationStore.configurations;

  constructor() {
    this.refresh();
  }

  protected refresh(): void {
    this.configurationStore.getAllConfigurations();
  }

  protected add(): void {
    this.openDialog({});
  }

  protected edit(configuration: ConfigurationsEntity): void {
    this.openDialog({ configuration });
  }

  private openDialog(data: CreateConfigurationsData): void {
    this.dialog
      .open<CreateConfigurationsComponent, CreateConfigurationsData, boolean>(
        CreateConfigurationsComponent,
        { width: '560px', data }
      )
      .afterClosed()
      .subscribe((changed) => {
        if (changed) {
          this.refresh();
        }
      });
  }
}
