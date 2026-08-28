import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAuditsUiComponent } from './list-audits-ui/list-audits-ui.component';
import { ClarityModule } from '@clr/angular';
import { AuditsDetailsComponent } from './audits-details/audits-details.component';

@NgModule({
    imports: [CommonModule, ClarityModule, ListAuditsUiComponent, AuditsDetailsComponent],
    exports: [ListAuditsUiComponent],
})
export class AuditTrailUiModule {}
