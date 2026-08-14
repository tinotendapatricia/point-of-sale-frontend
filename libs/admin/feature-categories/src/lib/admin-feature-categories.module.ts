import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { RolesDataAccessModule } from '@pos-frontend/roles/data-access';
import { RouterModule } from '@angular/router';
import { CategoriesDataAccessModule } from '@pos-frontend/categories/data-access';
import { CategoriesUiModule } from '@pos-frontend/categories/ui';
import { MatCardModule } from '@angular/material/card';
ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon);

@NgModule({
  imports: [
    CommonModule,
    CategoriesDataAccessModule,
    CategoriesUiModule,
    RolesDataAccessModule,
    MatCardModule,
    ClarityModule,
    RouterModule.forChild([
      { path: '', component: CategoriesListComponent},
    ]),
  ],
  declarations: [
    CategoriesListComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent
  ],
})
export class AdminFeatureCategoriesModule {}
