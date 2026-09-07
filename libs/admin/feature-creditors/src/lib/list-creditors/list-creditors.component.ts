import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatagridState } from '@pos-frontend/shared/utils';
import {
  CreditorsEntity,
  CreditorsFacade,
} from '@pos-frontend/creditors/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ListCreditorsUiComponent } from '@pos-frontend/creditors/ui';
import { AsyncPipe } from '@angular/common';
import { CreateCreditorsComponent } from '../create-creditors/create-creditors.component';
import { UpdateCreditorComponent } from '../update-creditor/update-creditor.component';

@Component({
    selector: 'pos-frontend-list-creditors',
    templateUrl: './list-creditors.component.html',
    styleUrls: ['./list-creditors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, ListCreditorsUiComponent, AsyncPipe]
})
export class ListCreditorsComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public creditorsFacade: CreditorsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public getCreditorList(state: DatagridState) {
    this.creditorsFacade.getPaginatedCreditors(state);
  }

  refresh() {
    this.getCreditorList({});
  }

  createCreditor() {
    this.dialog
      .open(CreateCreditorsComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateCreditor(creditor: CreditorsEntity) {
    this.dialog
      .open(UpdateCreditorComponent, { width: '480px', data: { creditor } })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  viewCreditor(creditor: CreditorsEntity) {
    this.router.navigate(['./creditor-details', creditor.id], {
      relativeTo: this.route,
    });
  }
}
