import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { GroupsEntity } from '@pos-frontend/groups/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-group-form',
    templateUrl: './group-form.component.html',
    styleUrls: ['./group-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class GroupFormComponent implements OnInit {
  @Input() group!: GroupsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public groupForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.group) {
      this.groupForm.patchValue(this.group);
    }
  }

  public createForm() {
    this.groupForm = this.formBuilder.group({
      name: '',
      id: '',
    });
  }
}
