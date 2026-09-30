import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Utilities } from '@pos-frontend/shared/utils';
import type { UsersEntity } from '@pos-frontend/users/data-access';

const NON_DISPLAYABLE_FIELDS = [
  'deleted',
  'id',
  'group',
  'roles',
  'accountNonLocked',
  'accountNonExpired',
  'authorities',
  'version',
];

@Component({
  selector: 'pos-frontend-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KeyValuePipe, TitleCasePipe],
})
export class UserDetailsComponent {
  readonly user = input<UsersEntity>();

  protected readonly decamelize = Utilities.decamelize;

  protected isHidden(field: string): boolean {
    return NON_DISPLAYABLE_FIELDS.includes(field);
  }
}
