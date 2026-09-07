import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatagridState } from '@pos-frontend/shared/utils';
import {
  DebtorsEntity,
  DebtorsFacade,
} from '@pos-frontend/debtors/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DebtorsListUiComponent } from '@pos-frontend/debtors/ui';
import { AsyncPipe } from '@angular/common';
import { CreateDebtorsComponent } from '../create-debtors/create-debtors.component';
import { UpdateDebtorsComponent } from '../update-debtors/update-debtors.component';

@Component({
    selector: 'pos-frontend-list-debtors',
    templateUrl: './list-debtors.component.html',
    styleUrls: ['./list-debtors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, DebtorsListUiComponent, AsyncPipe]
})
export class ListDebtorsComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public debtorsFacade: DebtorsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public getDebtorList(state: DatagridState) {
    this.debtorsFacade.getPaginatedDebtors(state);
  }

  refresh() {
    this.getDebtorList({});
  }

  createDebtor() {
    this.dialog
      .open(CreateDebtorsComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateDebtor(debtor: DebtorsEntity) {
    this.dialog
      .open(UpdateDebtorsComponent, { width: '480px', data: { debtor } })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  viewDebtor(debtor: DebtorsEntity) {
    this.router.navigate(['./debtor-details', debtor.id], {
      relativeTo: this.route,
    });
  }
}
