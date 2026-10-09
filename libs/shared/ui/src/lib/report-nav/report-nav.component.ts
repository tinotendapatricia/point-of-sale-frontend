import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** One entry in a report section: its child route path, label and one-line summary. */
export interface ReportNavItem {
  path: string;
  label: string;
  description: string;
}

/**
 * Vertical list of report links for a report section. Paths resolve relative
 * to the route that renders this component, so each report is a child route.
 */
@Component({
  selector: 'pos-frontend-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrl: './report-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class ReportNavComponent {
  readonly items = input.required<ReportNavItem[]>();
  readonly label = input('Reports');
}
