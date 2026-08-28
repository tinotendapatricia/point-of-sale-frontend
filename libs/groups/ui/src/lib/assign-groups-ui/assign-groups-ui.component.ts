import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { RolesEntity } from '@pos-frontend/roles/data-access';
import { ClrCheckboxModule } from '@clr/angular/forms/checkbox';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { RouterLink } from '@angular/router';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-assign-groups-ui',
    templateUrl: './assign-groups-ui.component.html',
    styleUrls: ['./assign-groups-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrCheckboxModule, ClrCommonFormsModule, RouterLink, ClrLoadingButtonModule, ClrLoadingModule, TitleCasePipe]
})
export class AssignGroupsUiComponent implements OnInit, OnChanges {
  @Input() roles: RolesEntity[] = [];
  @Input() groupRoles: RolesEntity[] = [];
  @Input() groupId!: string;
  @Input() btnState!: ClrLoadingState;
  @Output() save = new EventEmitter();
  rolesForm!: UntypedFormGroup;

  checkedRoles: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupRoles']?.currentValue) {
      this.groupRoles?.forEach((element) => {
        this.checkedRoles.push(element.id);
      });
    }
    if (changes['groupId']?.currentValue) {
      this.rolesForm.get('groupId')?.patchValue(this.groupId);
    }
  }

  ngOnInit(): void {
    this.rolesForm = this.fb.group({
      roles: '',
      groupId: '',
    });
  }

  isChecked(id: string) {
    return this.checkedRoles.some((r) => r === id);
  }

  pushToCheckedRoles(id: string) {
    const index = this.checkedRoles.indexOf(id);
    index === -1
      ? this.checkedRoles.push(id)
      : this.checkedRoles.splice(index, 1);
  }

  isAllSelected() {
    return this.checkedRoles?.length === this.roles?.length ? true : false;
  }

  pushAllRoles() {
    this.roles.forEach((ele) => {
      this.checkedRoles.some((r) => r === ele.id)
        ? null
        : this.checkedRoles.push(ele.id);
    });
  }

  onSave() {
    this.rolesForm.get('roles')?.patchValue(this.checkedRoles);
    this.save.emit(this.rolesForm.value);
  }
}
