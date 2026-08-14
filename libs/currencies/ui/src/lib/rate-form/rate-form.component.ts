import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'pos-frontend-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.scss'],
})
export class RateFormComponent {

  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() label=''
  //@Input() allGroups$!: Observable<GroupsEntity[]>;
  @Input() btnTitle!: string;
  public form!: UntypedFormGroup;
  public opened = true;


  constructor(private formBuilder: FormBuilder) {}
 

  ngOnInit(): void {
    this.createForm();

  }

  public createForm() {
    this.form = this.formBuilder.group({
      id: '',
      rate: '',
      effectiveDate:''
    });
  }
}
