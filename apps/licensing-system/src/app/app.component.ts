import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    selector: 'pos-frontend-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NxWelcomeComponent]
})
export class AppComponent {
  readonly title = 'licensing-system';
}
