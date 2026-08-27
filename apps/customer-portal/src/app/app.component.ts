import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pos-frontend-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  title = 'customer-portal';
}
