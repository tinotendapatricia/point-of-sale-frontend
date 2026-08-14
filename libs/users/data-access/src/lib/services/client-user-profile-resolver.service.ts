import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, NEVER, of, tap } from 'rxjs';
import { UserDataService } from './user-data.service';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root',
})
export class ClientUserProfileResolverService {
    private previousUrl: string | undefined;

    constructor(
        private usersService: UsersService,
        private userDataService: UserDataService,
        private router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.refresh(state.url)) {
            this.previousUrl = state.url;
            return this.fetchData();
        }

        this.previousUrl = state.url;
        return NEVER;
    }

    private fetchData() {
        return this.usersService.getClientUserProfile().pipe(
            tap((profile) => {
                this.userDataService.setUserProfile(profile);
                return profile
                    ? of(profile)
                    : this.router.navigate(['/auth/login']);
            }),
            catchError(() => {
                this.router.navigate(['/auth/login']);
                return EMPTY;
            })
        );
    }

    private refresh(currentUrl: string): boolean {
        return !this.previousUrl || this.previousUrl === currentUrl;
    }
}

