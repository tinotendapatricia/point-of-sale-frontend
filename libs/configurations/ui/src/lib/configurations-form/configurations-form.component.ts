import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-configurations-form',
    templateUrl: './configurations-form.component.html',
    styleUrls: ['./configurations-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
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
