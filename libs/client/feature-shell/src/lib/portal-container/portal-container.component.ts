import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'pos-frontend-portal-container',
    templateUrl: './portal-container.component.html',
    styleUrls: ['./portal-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HeaderComponent, RouterOutlet]
})
export class PortalContainerComponent implements OnInit {

  constructor(public authService: AuthenticationService, public usersService:UsersFacade) {}

  ngOnInit(): void {
     this.usersService.getUserProfile()
  }

  closeApp() {
    
    this.authService.logout();
  }
}
