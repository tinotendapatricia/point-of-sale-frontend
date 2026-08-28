import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { CategoriesEntity } from '@pos-frontend/categories/data-access';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';

@Component({
    selector: 'pos-frontend-category-list-ui',
    templateUrl: './category-list-ui.component.html',
    styleUrls: ['./category-list-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective]
})
export class CategoryListUiComponent {
  @Input() categoriesList: CategoriesEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateCategory = new EventEmitter<string | number>();

  constructor() {}

  ngOnInit(): void {}
}
