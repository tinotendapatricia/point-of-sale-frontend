import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CreditorsEntity } from '@pos-frontend/creditors/data-access';

@Component({
  selector: 'pos-frontend-creditors-form',
  templateUrl: './creditors-form.component.html',
  styleUrls: ['./creditors-form.component.scss'],
})
export class CreditorsFormComponent implements OnInit {
  @Input() creditor!: CreditorsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public creditorForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.creditor) {
    
      this.creditorForm.patchValue(this.creditor);
    }
  }

  public createForm() {
    this.creditorForm = this.formBuilder.group({
      name: '',
      account: '',
      address: '',
      description: '',
      id: '',
    });
  }
}
