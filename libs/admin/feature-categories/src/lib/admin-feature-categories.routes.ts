import { type Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

// CategoryStore is a root-provided signal store (see category.store.ts) — no
// route-level provider needed, unlike the legacy CategoriesFacade.
export const ADMIN_FEATURE_CATEGORIES_ROUTES: Routes = [
  { path: '', component: CategoriesListComponent },
  { path: 'new', component: CreateCategoryComponent },
  { path: 'update/:categoryId', component: UpdateCategoryComponent },
];
