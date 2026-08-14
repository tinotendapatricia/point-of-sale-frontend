import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsersEntity } from '../+state/users.models';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userProfileSubject = new BehaviorSubject<UsersEntity | undefined>(
    undefined
  );

  constructor() {}

  public getUserProfile() {
    return this.userProfileSubject.asObservable();
  }

  public setUserProfile(data: UsersEntity) {
    this.userProfileSubject.next(data);
  }
}
