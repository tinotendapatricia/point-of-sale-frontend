import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProductsEntity } from '@pos-frontend/products/data-access';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { NgSelectComponent, NgOptionComponent } from '@ng-select/ng-select';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-break-bulk-form',
    templateUrl: './break-bulk-form.component.html',
    styleUrls: ['./break-bulk-form.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, ClrCommonFormsModule, NgSelectComponent, NgOptionComponent, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class BreakBulkFormComponent implements OnInit {

   @Input() products: ProductsEntity[] = [];
    @Input() btnState = ClrLoadingState.DEFAULT;
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
        quantity:'',
        parentSize: '',
        
      });
    }
}
