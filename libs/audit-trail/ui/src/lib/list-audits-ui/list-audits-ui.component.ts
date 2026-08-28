import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { ClrDatagridModule } from '@clr/angular/data/datagrid';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { NgFor, NgIf } from '@angular/common';
import { AuditsDetailsComponent } from '../audits-details/audits-details.component';

@Component({
    selector: 'pos-frontend-list-audits-ui',
    templateUrl: './list-audits-ui.component.html',
    styleUrls: ['./list-audits-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, NgFor, AuditsDetailsComponent, NgIf]
})
export class ListAuditsUiComponent {
  @Input() auditsList: AuditsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() viewAuditPermissions = new EventEmitter<string | number>();
}
