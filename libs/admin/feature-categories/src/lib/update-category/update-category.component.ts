import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryStore } from '@pos-frontend/categories/data-access';
import {
  CategoryFormComponent,
  type CategoryFormValue,
} from '@pos-frontend/categories/ui';

@Component({
  selector: 'pos-frontend-update-category',
  templateUrl: './update-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, CategoryFormComponent],
})
export class UpdateCategoryComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly categoryStore = inject(CategoryStore);

  protected readonly submitting = this.categoryStore.updateLoading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('categoryId');
    if (id) {
      this.categoryStore.getCategory({ id });
    }
  }

  protected update(value: CategoryFormValue): void {
    const current = this.categoryStore.category();
    if (!current) {
      return;
    }
    this.categoryStore.updateCategory({
      data: { ...current, ...value },
      callback: () => void this.router.navigate(['/categories']),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/categories']);
  }
}
