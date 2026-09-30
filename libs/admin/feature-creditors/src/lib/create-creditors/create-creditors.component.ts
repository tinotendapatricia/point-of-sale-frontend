import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { CreditorStore } from '@pos-frontend/creditors/data-access';
import { type CreditorFormValue, CreditorsFormComponent } from '@pos-frontend/creditors/ui';

@Component({
  selector: 'pos-frontend-create-creditors',
  templateUrl: './create-creditors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CreditorsFormComponent],
})
export class CreateCreditorsComponent {
  private readonly router = inject(Router);
  // null when rendered outside a drawer; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly creditorStore = inject(CreditorStore);

  protected readonly submitting = this.creditorStore.createLoading;

  protected create(value: CreditorFormValue): void {
    this.creditorStore.createCreditor({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/creditors']);
    }
  }
}
