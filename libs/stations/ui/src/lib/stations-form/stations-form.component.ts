import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { StationsEntity } from '@pos-frontend/stations/data-access';

@Component({
    selector: 'pos-frontend-stations-form',
    templateUrl: './stations-form.component.html',
    styleUrls: ['./stations-form.component.scss'],
    standalone: false
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
