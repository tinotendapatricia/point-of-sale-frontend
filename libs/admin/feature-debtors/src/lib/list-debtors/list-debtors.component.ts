import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  DebtorsEntity,
  DebtorsFacade,
} from '@pos-frontend/debtors/data-access';

@Component({
  selector: 'pos-frontend-list-debtors',
  templateUrl: './list-debtors.component.html',
  styleUrls: ['./list-debtors.component.scss'],
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
