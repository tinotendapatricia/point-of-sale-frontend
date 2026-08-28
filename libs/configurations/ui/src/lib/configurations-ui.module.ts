import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsListUiComponent } from './configurations-list-ui/configurations-list-ui.component';
import { ConfigurationsFormComponent } from './configurations-form/configurations-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ConfigurationsListUiComponent, ConfigurationsFormComponent],
    exports: [ConfigurationsListUiComponent, ConfigurationsFormComponent],
})
export class ConfigurationsUiModule {}
