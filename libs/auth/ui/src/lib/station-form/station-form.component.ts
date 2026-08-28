import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { StationsEntity } from '@pos-frontend/stations/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-station-form',
    templateUrl: './station-form.component.html',
    styleUrls: ['./station-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class StationFormComponent implements OnInit  {

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
   this.createForm()
  }

  public createForm() {
    this.stationForm = this.formBuilder.group({
      stationNumber: '', 
    });
  }
}
