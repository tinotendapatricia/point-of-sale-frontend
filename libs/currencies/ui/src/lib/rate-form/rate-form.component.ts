import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-rate-form',
    templateUrl: './rate-form.component.html',
    styleUrls: ['./rate-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class RateFormComponent {

  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() label=''
  //@Input() allGroups$!: Observable<GroupsEntity[]>;
  @Input() btnTitle!: string;
  public form!: UntypedFormGroup;
  public opened = true;


  constructor(private formBuilder: FormBuilder) {}
 

  ngOnInit(): void {
    this.createForm();

  }

  public createForm() {
    this.form = this.formBuilder.group({
      id: '',
      rate: '',
      effectiveDate:''
    });
  }
}
