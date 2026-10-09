import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { type ReportNavItem, ReportNavComponent } from '../report-nav/report-nav.component';

/**
 * Page frame for a section split into child routes (reports, stock take):
 * title, a card listing the pages, and a card holding the selected page (its
 * title and summary, then the projected router outlet).
 */
@Component({
  selector: 'pos-frontend-reports-layout',
  templateUrl: './reports-layout.component.html',
  styleUrl: './reports-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportNavComponent],
})
export class ReportsLayoutComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly title = input.required<string>();
  readonly items = input.required<ReportNavItem[]>();
  readonly subtitle = input('Pick a report on the left, enter its details, then view it or download it.');
  /** Small heading above the list in the left card. */
  readonly navLabel = input('Reports');

  /** Path of the child route currently shown, e.g. 'till-cashup'. */
  private readonly activePath = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.childPath())
    ),
    { initialValue: this.childPath() }
  );

  protected readonly active = computed(() => this.items().find((item) => item.path === this.activePath()));

  private childPath(): string | undefined {
    // The child snapshot is not set yet while the first navigation is activating.
    return this.route.firstChild?.snapshot?.url[0]?.path;
  }
}
