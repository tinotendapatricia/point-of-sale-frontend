import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerRef } from '@pos-frontend/core';
import { VatStore } from '@pos-frontend/vat/data-access';
import { VatFormComponent, type VatFormValue } from '@pos-frontend/vat/ui';

/** Drawer content: edits the VAT setting currently held in the store. */
@Component({
  selector: 'pos-frontend-update-vat',
  templateUrl: './update-vat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VatFormComponent],
})
export class UpdateVatComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly vatStore = inject(VatStore);

  protected readonly vat = this.vatStore.vat;
  protected readonly submitting = this.vatStore.updateLoading;

  protected update(value: VatFormValue): void {
    const current = this.vat();
    if (!current) {
      return;
    }
    this.vatStore.updateVat({
      data: { ...current, ...value },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}
