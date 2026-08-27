import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-configurations-form',
    templateUrl: './configurations-form.component.html',
    styleUrls: ['./configurations-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ConfigurationsFormComponent implements OnInit {
  @Input() configuration!: ConfigurationsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  @Input() currencies!: CurrenciesEntity[];
  public configurationForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.configuration) {
      this.configurationForm.patchValue(this.configuration);

    }
  }

  public createForm() {
    this.configurationForm = this.formBuilder.group({
      copies: '',
      printerName: '',
      stationName:'',
      stationNumber:'',    
      id: '',
    });
  }
}
