import '@cds/core/icon/register.js';
import { ClarityIcons } from '@cds/core/icon';
// @clr/angular vendors its own, incompatible (older-shaped) window.CDS global-state
// initializer, lazily triggered by its icon/layer services during Angular bootstrap.
// Touching @cds/core's own state getter here, before Angular starts, wins that race so
// window.CDS ends up with the shape @cds/core's own code expects everywhere else.
ClarityIcons.addIcons();

import { environment } from './environments/environment';
import { Title, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient, withXhr, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { withEnabledBlockingInitialNavigation, provideRouter } from '@angular/router';
import { provideCoreServices } from '@pos-frontend/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ClarityModule, NgSelectModule),
    provideAnimations(),
    provideCoreServices(),
    provideStore({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !environment.production,
      connectInZone: true,
    }),
    provideEffects(),
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
    provideRouter(
      [
        {
          path: '',
          loadChildren: () =>
            import('@pos-frontend/admin/feature-shell').then(
              (mod) => mod.ADMIN_FEATURE_SHELL_ROUTES
            ),
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
  ],
}).catch((err) => console.error(err));
