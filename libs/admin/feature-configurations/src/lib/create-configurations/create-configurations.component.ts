import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { type ConfigurationFormValue, ConfigurationsFormComponent } from '@pos-frontend/configurations/ui';
import { injectDrawerRef } from '@pos-frontend/core';

/** Drawer content: opened from the configurations list. */
@Component({
  selector: 'pos-frontend-create-configurations',
  templateUrl: './create-configurations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfigurationsFormComponent],
})
export class CreateConfigurationsComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly submitting = this.configurationStore.createLoading;

  protected create(value: ConfigurationFormValue): void {
    this.configurationStore.createConfiguration({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    this.drawerRef.close(created);
  }
}
