import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import {CompanyEntity } from '@pos-frontend/company-details/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrTextareaModule } from '@clr/angular/forms/textarea';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-company-details-form',
    templateUrl: './company-details-form.component.html',
    styleUrls: ['./company-details-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrTextareaModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class CompanyDetailsFormComponent implements OnInit  {
 
  @Input() company!:CompanyEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public companyForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.company) {
      this.companyForm.patchValue(this.company);
    }
  }

  public createForm() {
    this.companyForm = this.formBuilder.group({
      name: '',
      address: '',
      bpNumber: '',
      tinNumber: '',
      email:'',
      phone:'',
      id: '',
    });
  }
}
