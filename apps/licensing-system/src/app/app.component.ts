import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    selector: 'pos-frontend-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NxWelcomeComponent]
})
export class AppComponent {
  title = 'licensing-system';
}
