import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { ConfigurationsFormComponent } from '../../../../../configurations/ui/src/lib/configurations-form/configurations-form.component';

@Component({
    selector: 'pos-frontend-create-configurations',
    templateUrl: './create-configurations.component.html',
    styleUrls: ['./create-configurations.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ConfigurationsFormComponent]
})
export class CreateConfigurationsComponent {
  @Output() closeModal = new EventEmitter();
  btnState$ = ClrLoadingState.DEFAULT;
  constructor(
    public configurationsService: ConfigurationsService,
    private router: Router,

  ) {}


  public createConfiguration(configuration: any) {
    this.btnState$ = ClrLoadingState.LOADING
    this.configurationsService.createConfiguration(configuration).subscribe({
      next:(res)=>{
        this.btnState$ = ClrLoadingState.SUCCESS
        Utilities.displayToast('success')
        res ? this.closeModal.emit(true) : null;
      },
      error:(err)=> {
        this.btnState$ = ClrLoadingState.ERROR 
      },
    })
    
  }
}
