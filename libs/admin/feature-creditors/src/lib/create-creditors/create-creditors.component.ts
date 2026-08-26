import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';

@Component({
    selector: 'pos-frontend-create-creditors',
    templateUrl: './create-creditors.component.html',
    styleUrls: ['./create-creditors.component.scss'],
    standalone: false
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
