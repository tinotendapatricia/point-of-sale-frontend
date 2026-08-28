import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationsEntity, ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Observable } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { ConfigurationsListUiComponent } from '@pos-frontend/configurations/ui';
import { CreateConfigurationsComponent } from '../create-configurations/create-configurations.component';
import { UpdateConfigurationsComponent } from '../update-configurations/update-configurations.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-configurations-list',
    templateUrl: './configurations-list.component.html',
    styleUrls: ['./configurations-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ClrIcon, ClrIconModule, ConfigurationsListUiComponent, CreateConfigurationsComponent, UpdateConfigurationsComponent, AsyncPipe]
})
export class ConfigurationsListComponent  implements AfterViewChecked, OnInit{
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedConfiguration!: ConfigurationsEntity;
  configurations$!:Observable<ConfigurationsEntity[]>;

  constructor(
    public configurationsService: ConfigurationsService,
    private cdr: ChangeDetectorRef,

  ) {}

  ngOnInit(): void {
    this.getConfigurationList()
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getConfigurationList() {
    this.configurations$ = this.configurationsService.getAllConfigurations()
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getConfigurationList();
  }

  updateConfiguration(configuration: ConfigurationsEntity) {
    this.selectedConfiguration = configuration;
    this.isUpdate = true;
  }


}
