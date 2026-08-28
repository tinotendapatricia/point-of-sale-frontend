import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { StationsEntity } from '@pos-frontend/stations/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrTextareaModule } from '@clr/angular/forms/textarea';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-stations-form',
    templateUrl: './stations-form.component.html',
    styleUrls: ['./stations-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrTextareaModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class StationsFormComponent  implements OnInit{
  @Input() station!: StationsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public stationForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.station) {
      this.stationForm.patchValue(this.station);
    }
  }

  public createForm() {
    this.stationForm = this.formBuilder.group({
      name: '',
      account: '',
      address: '',
      contact: '',
      id: '',
    });
  }
}
