import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { RolesEntity } from '@pos-frontend/roles/data-access';

@Component({
    selector: 'pos-frontend-user-roles-form',
    templateUrl: './user-roles-form.component.html',
    styleUrls: ['./user-roles-form.component.scss'],
    standalone: false
})
export class UserRolesFormComponent implements OnInit, OnChanges {

  @Input() roles: RolesEntity[] = [];
  @Input() userRoles: any;
  @Input() userId!: string|number;
  @Input() btnState!: ClrLoadingState;
  @Output() save = new EventEmitter();
  rolesForm!: UntypedFormGroup;

  checkedRoles: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRoles']?.currentValue) {
      this.userRoles?.forEach((element: { id: string; }) => {
        this.checkedRoles.push(element.id);
      });
    }
    if (changes['userId']?.currentValue) {
      this.rolesForm.get('userId')?.patchValue(this.userId);
    }
  }

  ngOnInit(): void {
    this.rolesForm = this.fb.group({
      roles: '',
      userId: '',
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
