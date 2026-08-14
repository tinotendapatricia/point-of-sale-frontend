import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsListUiComponent } from './stations-list-ui/stations-list-ui.component';
import { StationsFormComponent } from './stations-form/stations-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [StationsListUiComponent, StationsFormComponent],
  exports: [StationsListUiComponent, StationsFormComponent],
})
export class StationsUiModule {}
