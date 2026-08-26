import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';


@Component({
    selector: 'pos-frontend-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: false
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
