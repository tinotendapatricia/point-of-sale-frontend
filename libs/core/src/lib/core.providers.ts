import {
  provideHttpClient,
  withInterceptors,
  withXhr,
} from '@angular/common/http';
import { type EnvironmentProviders } from '@angular/core';

import { tokenInterceptor } from './services/token-interceptor.service';

/** HttpClient with the app-wide token/error interceptor. */
export function provideCoreServices(): EnvironmentProviders {
  return provideHttpClient(withXhr(), withInterceptors([tokenInterceptor]));
}
