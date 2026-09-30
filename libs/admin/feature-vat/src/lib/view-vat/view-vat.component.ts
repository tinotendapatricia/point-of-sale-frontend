import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '@pos-frontend/core';
import { VatStore } from '@pos-frontend/vat/data-access';
import { VatDetailsComponent } from '@pos-frontend/vat/ui';

import { UpdateVatComponent } from '../update-vat/update-vat.component';

@Component({
  selector: 'pos-frontend-view-vat',
  templateUrl: './view-vat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, MatButtonModule, MatIconModule, VatDetailsComponent],
})
export class ViewVatComponent {
  private readonly drawer = inject(DrawerService);
  private readonly injector = inject(Injector);
  private readonly vatStore = inject(VatStore);

  protected readonly vat = this.vatStore.vat;
  protected readonly loading = this.vatStore.getOneLoading;

  constructor() {
    this.refresh();
  }

  protected refresh(): void {
    this.vatStore.getVat();
  }

  protected update(): void {
    this.drawer
      .open<UpdateVatComponent, boolean>(UpdateVatComponent, {
        title: 'Update VAT',
        size: 'sm',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }
}
