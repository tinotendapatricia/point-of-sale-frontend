import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfigurationsEntity, ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Observable } from 'rxjs';

@Component({
    selector: 'pos-frontend-configurations-list',
    templateUrl: './configurations-list.component.html',
    styleUrls: ['./configurations-list.component.scss'],
    standalone: false
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
