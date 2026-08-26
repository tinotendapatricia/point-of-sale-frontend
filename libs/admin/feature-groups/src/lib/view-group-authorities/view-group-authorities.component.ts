import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { RolesFacade } from '@pos-frontend/roles/data-access';

@Component({
    selector: 'pos-frontend-view-group-authorities',
    templateUrl: './view-group-authorities.component.html',
    styleUrls: ['./view-group-authorities.component.scss'],
    standalone: false
})
export class ViewGroupAuthoritiesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public groupFacade: GroupsFacade,
    public rolesFacade: RolesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolesFacade.getAllRoles();
    this.groupFacade.getGroup(
      this.activatedRoute.snapshot.paramMap.get('groupId')!
    );
  }

  onSubmit(rolesDetails: any) {
    rolesDetails.groupId = this.activatedRoute.snapshot.paramMap.get('groupId')!;
    this.groupFacade.assignGroupRoles(rolesDetails);
    this.groupFacade.loaded$.subscribe((res) => {
      res ? this.router.navigate(['/groups']) : null;
    });
  }
}
