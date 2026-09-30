import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryStore } from '@pos-frontend/categories/data-access';
import {
  CategoryFormComponent,
  type CategoryFormValue,
} from '@pos-frontend/categories/ui';
import { injectDrawerRef } from '@pos-frontend/core';

@Component({
  selector: 'pos-frontend-create-category',
  templateUrl: './create-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CategoryFormComponent],
})
export class CreateCategoryComponent {
  private readonly router = inject(Router);
  // null on the routed /categories/new page; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly categoryStore = inject(CategoryStore);

  protected readonly submitting = this.categoryStore.createLoading;

  protected create(value: CategoryFormValue): void {
    this.categoryStore.createCategory({
      data: value,
      callback: () => this.close(true),
    });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/categories']);
    }
  }
}
