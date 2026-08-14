import { Component, OnInit, Input } from '@angular/core';
import { Utilities } from '@pos-frontend/shared/utils';
import { UsersEntity } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() user!: UsersEntity;

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
