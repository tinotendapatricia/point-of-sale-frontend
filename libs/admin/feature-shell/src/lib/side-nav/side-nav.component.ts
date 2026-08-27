import { ChangeDetectorRef, Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'pos-frontend-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SideNavComponent {}
