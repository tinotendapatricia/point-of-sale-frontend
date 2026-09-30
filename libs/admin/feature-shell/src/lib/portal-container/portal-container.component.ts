import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
    selector: 'pos-frontend-portal-container',
    templateUrl: './portal-container.component.html',
    styleUrl: './portal-container.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, SideNavComponent, RouterOutlet],
})
export class PortalContainerComponent {}
