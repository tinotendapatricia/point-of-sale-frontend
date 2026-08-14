import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  CreditorsEntity,
  CreditorsFacade,
} from '@pos-frontend/creditors/data-access';

@Component({
  selector: 'pos-frontend-list-creditors',
  templateUrl: './list-creditors.component.html',
  styleUrls: ['./list-creditors.component.scss'],
})
export class ListCreditorsComponent implements AfterViewChecked {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedCreditor!: CreditorsEntity;

  constructor(
    public creditorsFacade: CreditorsFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getCreditorList(state: ClrDatagridStateInterface) {
    this.creditorsFacade.getPaginatedCreditors(state);
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getCreditorList({});
  }

  updateCreditor(creditor: any) {
    this.selectedCreditor = creditor;
    this.isUpdate = true;
  }

  viewCreditor(creditor: CreditorsEntity) {
    this.router.navigate(['./creditor-details', creditor.id], {
      relativeTo: this.route,
    });
  }


}
