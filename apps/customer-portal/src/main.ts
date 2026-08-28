import '@cds/core/icon/register.js';
import { ClarityIcons } from '@cds/core/icon';
// @clr/angular vendors its own, incompatible (older-shaped) window.CDS global-state
// initializer, lazily triggered by its icon/layer services during Angular bootstrap.
// Touching @cds/core's own state getter here, before Angular starts, wins that race so
// window.CDS ends up with the shape @cds/core's own code expects everywhere else.
ClarityIcons.addIcons();

import { environment } from './environments/environment';
import { Title, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient, withXhr, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { withEnabledBlockingInitialNavigation, provideRouter } from '@angular/router';
import { CoreModule } from '@pos-frontend/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, BrowserAnimationsModule, ClarityModule, NgSelectModule, CoreModule, StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true,
            },
        }), StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !environment.production,
            connectInZone: true
        }), EffectsModule.forRoot([])),
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
        provideRouter([
            {
                path: '',
                loadChildren: () => import('@pos-frontend/client/feature-shell').then((mod) => mod.ClientFeatureShellModule),
            },
        ], withEnabledBlockingInitialNavigation())
    ]
})
  .catch((err) => console.error(err));
