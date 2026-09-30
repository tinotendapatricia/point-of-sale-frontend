import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Unrouted placeholder; nothing references it. */
@Component({
  selector: 'pos-frontend-delete-category',
  templateUrl: './delete-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCategoryComponent {}
