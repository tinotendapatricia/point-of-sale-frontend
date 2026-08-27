import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersFacade } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-view-user',
  templateUrl: './view-user.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./view-user.component.scss'],
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
