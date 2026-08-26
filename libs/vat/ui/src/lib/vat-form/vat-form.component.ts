import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { VatEntity } from '@pos-frontend/vat/data-access';

@Component({
    selector: 'pos-frontend-vat-form',
    templateUrl: './vat-form.component.html',
    styleUrls: ['./vat-form.component.scss'],
    standalone: false
})
export class VatFormComponent implements OnInit {
  @Input() vat!: VatEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public vatForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.vat) {
      this.vatForm.patchValue(this.vat);
    }
  }

  public createForm() {
    this.vatForm = this.formBuilder.group({
      vat: '',
      id: '',
    });
  }
}
