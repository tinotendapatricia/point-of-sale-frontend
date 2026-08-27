import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { AuditsEntity } from '@pos-frontend/audit-trail/data-access';

@Component({
    selector: 'pos-frontend-list-audits-ui',
    templateUrl: './list-audits-ui.component.html',
    styleUrls: ['./list-audits-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListAuditsUiComponent {
  @Input() auditsList: AuditsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() viewAuditPermissions = new EventEmitter<string | number>();
}
