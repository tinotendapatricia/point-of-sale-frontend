import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';


@Component({
    selector: 'pos-frontend-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class LoginFormComponent implements OnInit {
  @Input() title=''
  @Input() isClient = false
  @Output()license = new EventEmitter();
  @Output() setStation = new EventEmitter();
  @Input() btnState$ = ClrLoadingState.DEFAULT;
  @Output() formValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() forgotPassword = new EventEmitter<any>();
  @Output() makePayment = new EventEmitter<any>();
  public form = new UntypedFormGroup({});
  station = localStorage.getItem('station');

  constructor() {}

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
  }
}
