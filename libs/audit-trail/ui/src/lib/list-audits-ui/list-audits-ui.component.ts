import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { DatagridState } from '@pos-frontend/shared/utils';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuditsDetailsComponent } from '../audits-details/audits-details.component';

@Component({
    selector: 'pos-frontend-list-audits-ui',
    templateUrl: './list-audits-ui.component.html',
    styleUrls: ['./list-audits-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, AuditsDetailsComponent]
})
export class ListAuditsUiComponent implements OnInit {
  @Input() auditsList: AuditsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<DatagridState>();
  @Output() viewAuditPermissions = new EventEmitter<string | number>();

  readonly displayedColumns = ['name', 'actionedBy', 'createdAt', 'actions'];
  readonly pageSizeOptions = [10, 25, 50];
  readonly pageSize = 10;
  expandedAudit: AuditsEntity | null = null;

  ngOnInit(): void {
    this.updatedState.emit({ page: { from: 0, size: this.pageSize } });
  }

  onPage(event: PageEvent): void {
    this.updatedState.emit({
      page: { from: event.pageIndex * event.pageSize, size: event.pageSize },
    });
  }

  toggleDetail(audit: AuditsEntity): void {
    this.expandedAudit = this.expandedAudit === audit ? null : audit;
  }
}
