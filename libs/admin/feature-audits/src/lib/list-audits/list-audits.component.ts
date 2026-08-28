import { ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { AuditsEntity, AuditsFacade } from '@pos-frontend/audit-trail/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { ListAuditsUiComponent } from '@pos-frontend/audit-trail/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-list-audits',
    templateUrl: './list-audits.component.html',
    styleUrls: ['./list-audits.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, RouterLinkActive, RouterLink, ClrIcon, ClrIconModule, ListAuditsUiComponent, AsyncPipe]
})
export class ListAuditsComponent {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedAudit!: AuditsEntity;

  constructor(
    public auditsFacade: AuditsFacade,
    private cdr: ChangeDetectorRef,

  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getAuditList(state: ClrDatagridStateInterface) {
    this.auditsFacade.getPaginatedAudits(state);
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getAuditList({});
  }



}
