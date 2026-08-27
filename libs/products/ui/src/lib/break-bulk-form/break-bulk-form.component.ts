import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-break-bulk-form',
    templateUrl: './break-bulk-form.component.html',
    styleUrls: ['./break-bulk-form.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
