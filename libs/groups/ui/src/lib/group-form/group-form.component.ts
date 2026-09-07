import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GroupsEntity } from '@pos-frontend/groups/data-access';

@Component({
    selector: 'pos-frontend-group-form',
    templateUrl: './group-form.component.html',
    styleUrls: ['./group-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class GroupFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly group = input<GroupsEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly groupForm = this.formBuilder.group({
    name: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const group = this.group();
      if (group) {
        this.groupForm.patchValue(group);
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.groupForm.value);
  }
}
