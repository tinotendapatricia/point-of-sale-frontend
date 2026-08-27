import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsFacade } from '@pos-frontend/groups/data-access';

@Component({
    selector: 'pos-frontend-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CreateGroupComponent {
  @Output() closeModal = new EventEmitter();
  constructor(
    public groupsService: GroupsFacade,
    private router: Router // public groupsFacade: GroupsFacade
  ) {}

  ngOnInit(): void {
    // this.groupsFacade.getAllGroups();
  }

  public createGroup(group: any) {
    this.groupsService.createNewGroup(group);
    this.groupsService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(): null;
    });
  }
}
