import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from '@pos-frontend/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({ declarations: [AppComponent, NxWelcomeComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ClarityModule,
        NgSelectModule,
        RouterModule.forRoot([
            {
                path: '',
                loadChildren: () => import('@pos-frontend/client/feature-shell').then((mod) => mod.ClientFeatureShellModule),
            },
        ], { initialNavigation: 'enabledBlocking' }),
        CoreModule,
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true,
            },
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !environment.production,
            connectInZone: true
        }),
        EffectsModule.forRoot([])], providers: [
        { provide: 'BaseUrl', useValue: environment.baseUrl },
        Title,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ] })
export class AppModule {}
