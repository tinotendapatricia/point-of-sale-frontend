import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { Utilities } from '@pos-frontend/shared/utils';

@Component({
    selector: 'pos-frontend-audits-details',
    templateUrl: './audits-details.component.html',
    styleUrls: ['./audits-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AuditsDetailsComponent {
  @Input() audit!: AuditsEntity;
  @Output() download = new EventEmitter();
  public decamelize = Utilities.decamelize;
  public nonDisplayableFields = ['__v', 'id', 'password','_id'];

  constructor() {}

  ngOnInit(): void {}

  public isHide(field: string | undefined) {
    return this.nonDisplayableFields.some((element) => element === field);
  }
}
