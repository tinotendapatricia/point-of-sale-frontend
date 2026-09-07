import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationsEntity, ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { ConfigurationsFormComponent } from '@pos-frontend/configurations/ui';

export interface UpdateConfigurationsData {
  configuration: ConfigurationsEntity;
}

@Component({
    selector: 'pos-frontend-update-configurations',
    templateUrl: './update-configurations.component.html',
    styleUrls: ['./update-configurations.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ConfigurationsFormComponent]
})
export class UpdateConfigurationsComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateConfigurationsComponent, boolean>);
  private readonly data = inject<UpdateConfigurationsData>(MAT_DIALOG_DATA);
  private readonly configurationsService = inject(ConfigurationsService);

  readonly configuration = this.data.configuration;
  readonly submitting = signal(false);

  public createConfiguration(configuration: any) {
    this.submitting.set(true);
    this.configurationsService.updateConfiguration(configuration).subscribe({
      next: (res) => {
        this.submitting.set(false);
        Utilities.displayToast('success');
        if (res) {
          this.dialogRef.close(true);
        }
      },
      error: () => this.submitting.set(false),
    });
  }
}
