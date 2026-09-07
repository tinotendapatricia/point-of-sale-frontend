import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesFacade } from '@pos-frontend/roles/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';
import { MatCardModule } from '@angular/material/card';
import { UserRolesFormComponent } from '@pos-frontend/users/ui';

@Component({
    selector: 'pos-frontend-view-user-roles',
    templateUrl: './view-user-roles.component.html',
    styleUrls: ['./view-user-roles.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCardModule, UserRolesFormComponent]
})
export class ViewUserRolesComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly userFacade = inject(UsersFacade);
  readonly rolesFacade = inject(RolesFacade);

  readonly allRoles = toSignal(this.rolesFacade.allRoles$, { initialValue: [] });
  readonly selectedUser = toSignal(this.userFacade.selectedUser$, { initialValue: undefined });

  constructor() {
    this.rolesFacade.getAllRoles();
    this.userFacade.getUserById(
      this.activatedRoute.snapshot.paramMap.get('userId')!
    );
  }

  onSubmit(rolesDetails: any) {
    rolesDetails.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;
    this.userFacade.assignUserRoles(rolesDetails);
    this.userFacade.loaded$.pipe(take(1)).subscribe((res) => {
      res ? this.router.navigate(['/users']) : null;
    });
  }
}
