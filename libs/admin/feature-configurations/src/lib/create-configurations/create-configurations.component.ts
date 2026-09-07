import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { ConfigurationsFormComponent } from '@pos-frontend/configurations/ui';

@Component({
    selector: 'pos-frontend-create-configurations',
    templateUrl: './create-configurations.component.html',
    styleUrls: ['./create-configurations.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ConfigurationsFormComponent]
})
export class CreateConfigurationsComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateConfigurationsComponent, boolean>);
  private readonly configurationsService = inject(ConfigurationsService);

  readonly submitting = signal(false);

  public createConfiguration(configuration: any) {
    this.submitting.set(true);
    this.configurationsService.createConfiguration(configuration).subscribe({
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
