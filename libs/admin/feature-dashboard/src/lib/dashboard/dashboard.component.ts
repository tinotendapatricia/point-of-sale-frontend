import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pos-frontend-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DashboardComponent {}
