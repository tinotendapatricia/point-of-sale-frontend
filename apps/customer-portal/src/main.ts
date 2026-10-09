import { environment } from './environments/environment';
import { Title, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { importProvidersFrom } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { withEnabledBlockingInitialNavigation, provideRouter } from '@angular/router';
import { provideCoreServices } from '@pos-frontend/core';
import { BASE_URL } from '@pos-frontend/shared/data-access';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(NgSelectModule),
    provideAnimations(),
    provideCoreServices(),
    { provide: BASE_URL, useValue: environment.baseUrl },
    Title,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideRouter(
      [
        {
          path: '',
          loadChildren: () =>
            import('@pos-frontend/client/feature-shell').then(
              (mod) => mod.CLIENT_FEATURE_SHELL_ROUTES
            ),
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
  ],
}).catch((err) => console.error(err));
