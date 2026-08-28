import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CategoriesEntity } from '@pos-frontend/categories/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class CategoryFormComponent {
  @Input() categorie!: CategoriesEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public categorieForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.categorie) {
      this.categorieForm.patchValue(this.categorie);
    }
  }

  public createForm() {
    this.categorieForm = this.formBuilder.group({
      name: '',
      code:'',
      id: '',
    });
  }
}
