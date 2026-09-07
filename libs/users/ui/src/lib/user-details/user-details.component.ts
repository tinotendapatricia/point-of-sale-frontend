import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Utilities } from '@pos-frontend/shared/utils';
import { UsersEntity } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./user-details.component.scss'],
  imports: [KeyValuePipe, TitleCasePipe],
})
export class UserDetailsComponent {
  readonly user = input<UsersEntity>();

  public decamelize = Utilities.decamelize;
  public nonDisplayableFields = [
    'deleted',
    'id',
    'group',
    'accountNonLocked',
    'accountNonExpired',
    'authorities',
    'version',
  ];

  public isHide(field: string | undefined) {
    return this.nonDisplayableFields.some((element) => element === field);
  }
}
