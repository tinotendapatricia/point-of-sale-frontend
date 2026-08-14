import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-portal-container',
  templateUrl: './portal-container.component.html',
  styleUrls: ['./portal-container.component.scss'],
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
