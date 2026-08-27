import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';


@Component({
    selector: 'pos-frontend-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
