import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CategoriesEntity } from '@pos-frontend/categories/data-access';

@Component({
    selector: 'pos-frontend-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    standalone: false
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
