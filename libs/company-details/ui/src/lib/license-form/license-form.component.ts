import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CompanyEntity } from '@pos-frontend/company-details/data-access';

@Component({
  selector: 'pos-frontend-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss'],
})
export class LicenseFormComponent implements OnInit {

  
  @Input() company!:CompanyEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public licenseForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.licenseForm = this.formBuilder.group({
      license: '',
      id: '',
    });
  }
}
