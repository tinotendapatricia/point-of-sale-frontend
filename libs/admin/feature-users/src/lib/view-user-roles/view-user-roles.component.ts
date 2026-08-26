import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesFacade } from '@pos-frontend/roles/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';

@Component({
    selector: 'pos-frontend-view-user-roles',
    templateUrl: './view-user-roles.component.html',
    styleUrls: ['./view-user-roles.component.scss'],
    standalone: false
})
export class ViewUserRolesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public userFacade: UsersFacade,
    public rolesFacade: RolesFacade,
    
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolesFacade.getAllRoles();
    this.userFacade.getUserById(
      this.activatedRoute.snapshot.paramMap.get('userId')!
    );
  }

  onSubmit(rolesDetails: any) {
    rolesDetails.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;
    this.userFacade.assignUserRoles(rolesDetails);
    this.userFacade.loaded$.subscribe((res) => {
      res ? this.router.navigate(['/users']) : null;
    });
  }
}
