import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsEntity } from '@pos-frontend/products/data-access';
import { NgSelectComponent, NgOptionComponent } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'pos-frontend-break-bulk-form',
    templateUrl: './break-bulk-form.component.html',
    styleUrls: ['./break-bulk-form.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgSelectComponent, NgOptionComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class BreakBulkFormComponent implements OnInit {
  @Input() products: ProductsEntity[] = [];
  @Input() loading = false;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  public form!: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      parentId: '',
      childId: '',
      quantity: '',
      parentSize: '',
    });
  }
}
