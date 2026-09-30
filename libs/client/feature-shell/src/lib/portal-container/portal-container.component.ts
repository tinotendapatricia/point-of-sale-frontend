import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

/** Till layout: header (which loads the signed-in user) above the routed page. */
@Component({
  selector: 'pos-frontend-portal-container',
  templateUrl: './portal-container.component.html',
  styleUrl: './portal-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, RouterOutlet],
})
export class PortalContainerComponent {}
