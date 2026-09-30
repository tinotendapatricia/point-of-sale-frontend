import { HttpParams } from '@angular/common/http';

type ParamValue = string | number | boolean | null | undefined;

/**
 * Builds HttpParams from a filters object, dropping null/undefined values
 * (HttpParams fromObject rejects them).
 */
export function toHttpParams(filters?: object | null): HttpParams {
  let params = new HttpParams();
  if (!filters) {
    return params;
  }
  for (const [key, value] of Object.entries(filters) as [string, ParamValue][]) {
    if (value !== null && value !== undefined) {
      params = params.set(key, String(value));
    }
  }
  return params;
}
