import { AfterViewChecked, ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  DebtorsEntity,
  DebtorsFacade,
} from '@pos-frontend/debtors/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { DebtorsListUiComponent } from '@pos-frontend/debtors/ui';
import { CreateDebtorsComponent } from '../create-debtors/create-debtors.component';
import { UpdateDebtorsComponent } from '../update-debtors/update-debtors.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-list-debtors',
    templateUrl: './list-debtors.component.html',
    styleUrls: ['./list-debtors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ClrIcon, ClrIconModule, DebtorsListUiComponent, CreateDebtorsComponent, UpdateDebtorsComponent, AsyncPipe]
})
export class ListDebtorsComponent implements AfterViewChecked {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedDebtor!: DebtorsEntity;

  constructor(
    public debtorsFacade: DebtorsFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getDebtorList(state: ClrDatagridStateInterface) {
    this.debtorsFacade.getPaginatedDebtors(state);
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getDebtorList({});
  }

  updateDebtor(debtor: DebtorsEntity) {
    this.selectedDebtor = debtor;
    this.isUpdate = true;
  }

  viewDebtor(debtor: DebtorsEntity) {
    this.router.navigate(['./debtor-details', debtor.id], {
      relativeTo: this.route,
    });
  }

  changeDebtorstatus(debtor: DebtorsEntity) {
    this.selectedDebtor = debtor;
    this.isChangeStatus = true;
  }

  viewDebtorAuthorities(debtorId: any) {
    this.router.navigate(['./view-debtor', debtorId], {
      relativeTo: this.route,
    });
  }
}
