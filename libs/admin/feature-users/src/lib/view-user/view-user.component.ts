import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UsersFacade } from '@pos-frontend/users/data-access';
import { UserDetailsComponent } from '@pos-frontend/users/ui';

@Component({
  selector: 'pos-frontend-view-user',
  templateUrl: './view-user.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./view-user.component.scss'],
  imports: [RouterLink, MatIconModule, UserDetailsComponent, AsyncPipe],
})
export class ViewUserComponent implements OnInit {
  constructor(
    public usersFacade: UsersFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usersFacade.getUserById(
      this.activatedRoute.snapshot.paramMap.get('userId')!
    );
  }
}
