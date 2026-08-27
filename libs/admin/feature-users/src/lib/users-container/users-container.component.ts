import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pos-frontend-users-container',
  templateUrl: './users-container.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./users-container.component.scss'],
})
export class UsersContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
