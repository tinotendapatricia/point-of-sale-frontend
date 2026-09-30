import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerData, injectDrawerRef } from '@pos-frontend/core';
import { type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';
import { type CreditorFormValue, CreditorsFormComponent } from '@pos-frontend/creditors/ui';

/** Drawer payload: the row being edited. */
export interface UpdateCreditorData {
  creditor: CreditorsEntity;
}

/** Drawer content: edits the creditor passed in `DrawerConfig.data`. */
@Component({
  selector: 'pos-frontend-update-creditor',
  templateUrl: './update-creditor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CreditorsFormComponent],
})
export class UpdateCreditorComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly data = injectDrawerData<UpdateCreditorData>();
  private readonly creditorStore = inject(CreditorStore);

  protected readonly creditor = this.data.creditor;
  protected readonly submitting = this.creditorStore.updateLoading;

  protected update(value: CreditorFormValue): void {
    this.creditorStore.updateCreditor({
      data: { ...value, id: this.creditor.id },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}
