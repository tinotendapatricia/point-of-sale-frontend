import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { StationsEntity } from '@pos-frontend/stations/data-access';

@Component({
    selector: 'pos-frontend-station-form',
    templateUrl: './station-form.component.html',
    styleUrls: ['./station-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
