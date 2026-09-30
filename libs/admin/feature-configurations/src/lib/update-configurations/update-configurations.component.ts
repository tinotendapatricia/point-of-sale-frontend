import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { type ConfigurationsEntity, ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { type ConfigurationFormValue, ConfigurationsFormComponent } from '@pos-frontend/configurations/ui';
import { injectDrawerData, injectDrawerRef } from '@pos-frontend/core';

export interface UpdateConfigurationsData {
  configuration: ConfigurationsEntity;
}

/** Drawer content: opened from the configurations list with the row to edit. */
@Component({
  selector: 'pos-frontend-update-configurations',
  templateUrl: './update-configurations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfigurationsFormComponent],
})
export class UpdateConfigurationsComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly configuration = injectDrawerData<UpdateConfigurationsData>().configuration;
  protected readonly submitting = this.configurationStore.updateLoading;

  protected update(value: ConfigurationFormValue): void {
    this.configurationStore.updateConfiguration({
      data: { ...value, id: this.configuration.id },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}
