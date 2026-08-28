import { ChangeDetectorRef, Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ClrVerticalNavModule } from '@clr/angular/layout/vertical-nav';
import { ClrStandaloneCdkTrapFocus } from '@clr/angular/utils';
import { ClrNavigationModule } from '@clr/angular/layout/nav';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';

@Component({
    selector: 'pos-frontend-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, RouterLinkActive, RouterLink, ClrIcon, ClrIconModule]
})
export class SideNavComponent {}
