import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { CreditorsFormComponent } from '../../../../../creditors/ui/src/lib/creditors-form/creditors-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-create-creditors',
    templateUrl: './create-creditors.component.html',
    styleUrls: ['./create-creditors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CreditorsFormComponent, AsyncPipe]
})
export class CreateCreditorsComponent {
  @Output() closeModal = new EventEmitter();
  constructor(
    public creditorsService: CreditorsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.creditorsFacade.getAllCreditors();
  }

  public createCreditor(creditor: any) {
    this.creditorsService.createNewCreditor(creditor);
    this.creditorsService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit() : null;
    });
  }
}
