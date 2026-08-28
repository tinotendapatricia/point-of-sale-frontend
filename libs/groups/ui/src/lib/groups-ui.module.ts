import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupFormComponent } from './group-form/group-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ListGroupsUiComponent } from './list-groups-ui/list-groups-ui.component';
import { AssignGroupsUiComponent } from './assign-groups-ui/assign-groups-ui.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ReactiveFormsModule,
        ClarityModule,
        RouterModule,
        GroupFormComponent,
        ListGroupsUiComponent,
        AssignGroupsUiComponent,
    ],
    exports: [GroupFormComponent, ListGroupsUiComponent, AssignGroupsUiComponent],
})
export class GroupsUiModule {}
