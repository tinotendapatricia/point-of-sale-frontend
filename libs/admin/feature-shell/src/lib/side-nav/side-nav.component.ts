import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'pos-frontend-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive, MatIconModule]
})
export class SideNavComponent {
  private readonly router = inject(Router);

  private static readonly GROUP_PATHS: Record<string, string[]> = {
    products: ['/products'],
    purchases: ['/creditors', '/purchase-orders', '/receive-products', '/purchases-reports'],
    sales: ['/debtors', '/sales-reports'],
    stock: ['/stock-take', '/stocks'],
  };

  readonly openGroups = signal<Set<string>>(
    new Set(
      Object.entries(SideNavComponent.GROUP_PATHS)
        .filter(([, paths]) => paths.some((path) => this.router.url.startsWith(path)))
        .map(([key]) => key)
    )
  );

  isOpen(key: string): boolean {
    return this.openGroups().has(key);
  }

  toggle(key: string): void {
    this.openGroups.update((current) => {
      const next = new Set(current);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }
}
