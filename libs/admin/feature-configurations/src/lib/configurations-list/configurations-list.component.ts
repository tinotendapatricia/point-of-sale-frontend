import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ConfigurationsEntity, ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Observable } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationsListUiComponent } from '@pos-frontend/configurations/ui';
import { CreateConfigurationsComponent } from '../create-configurations/create-configurations.component';
import { UpdateConfigurationsComponent } from '../update-configurations/update-configurations.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-configurations-list',
    templateUrl: './configurations-list.component.html',
    styleUrls: ['./configurations-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, ConfigurationsListUiComponent, AsyncPipe]
})
export class ConfigurationsListComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  configurations$!: Observable<ConfigurationsEntity[]>;

  constructor(public configurationsService: ConfigurationsService) {}

  ngOnInit(): void {
    this.getConfigurationList();
  }

  public getConfigurationList() {
    this.configurations$ = this.configurationsService.getAllConfigurations();
  }

  createConfiguration() {
    this.dialog
      .open(CreateConfigurationsComponent, { width: '520px' })
      .afterClosed()
      .subscribe((created) => created && this.getConfigurationList());
  }

  updateConfiguration(configuration: ConfigurationsEntity) {
    this.dialog
      .open(UpdateConfigurationsComponent, { width: '520px', data: { configuration } })
      .afterClosed()
      .subscribe((updated) => updated && this.getConfigurationList());
  }
}
