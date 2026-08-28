import { EnvironmentProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { provideAuthDataAccess } from '@pos-frontend/auth/data-access';

export function provideCoreServices(): (Provider | EnvironmentProviders)[] {
  return [
    provideAuthDataAccess(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ];
}
