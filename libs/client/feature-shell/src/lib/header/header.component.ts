import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';
import { ActionConfirmationFormComponent } from '../../../../../shared/ui/src/lib/action-confirmation-form/action-confirmation-form.component';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'pos-frontend-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ActionConfirmationFormComponent, AsyncPipe]
})
export class HeaderComponent implements OnInit {
  isClose = false;
  station = localStorage.getItem('station');


  constructor(public authService: AuthenticationService, public usersService:UsersFacade) {}

  ngOnInit(): void {
     this.usersService.getUserProfile()
  }

  closeApp() {
    this.isClose = false;
    this.authService.logout();
  }
}
