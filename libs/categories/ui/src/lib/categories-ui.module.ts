import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListUiComponent } from './category-list-ui/category-list-ui.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule,],
  declarations: [CategoryFormComponent, CategoryListUiComponent],
  exports: [CategoryFormComponent, CategoryListUiComponent],
})
export class CategoriesUiModule {}
