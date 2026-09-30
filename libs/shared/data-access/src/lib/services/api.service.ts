import {
  HttpClient,
  type HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { type Observable, catchError, throwError } from 'rxjs';

/** Backend base URL, provided once per app in main.ts. */
export const BASE_URL = new InjectionToken<string>('BaseUrl');

type ContentType = '' | 'file' | 'form-data' | 'multipart-form-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    _contentType?: string,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${path}`, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  post<T>(
    path: string,
    body: unknown,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, {
        headers,
        params: params ?? new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  postWithAuth<T>(
    path: string,
    body: unknown,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(
    path: string,
    body: unknown = {},
    params?: HttpParams,
    contentType?: ContentType
  ): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType ?? ''),
        params: params ?? new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  patch<T>(
    path: string,
    body: unknown = {},
    params?: HttpParams,
    contentType?: ContentType
  ): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType ?? ''),
        params: params ?? new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(
    path: string,
    contentType?: ContentType,
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${path}`, {
        headers: this.setHeaders(contentType ?? ''),
        params: params ?? new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  file<T>(path: string, file: File): Observable<T> {
    const formData: FormData = new FormData();

    formData.append('file', file, file?.name);
    return this.http
      .post<T>(`${this.baseUrl}${path}`, formData)
      .pipe(catchError(this.formatErrors));
  }

  getFile(path: string, params: HttpParams = new HttpParams()): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${path}`, {
      params,
      responseType: 'blob',
    });
  }

  postFile(
    path: string,
    fileDetails?: unknown,
    params: HttpParams = new HttpParams()
  ): Observable<Blob> {
    return this.http.post(`${this.baseUrl}${path}`, fileDetails, {
      params,
      responseType: 'blob',
    });
  }

  upload<T>(path: string, file: File): Observable<HttpEvent<T>> {
    const formData: FormData = new FormData();

    formData.append('file', file, file?.name);
    return this.http.request<T>(
      new HttpRequest('POST', `${this.baseUrl}${path}`, formData, {
        reportProgress: false,
      })
    );
  }

  private setHeaders(contentType: ContentType): HttpHeaders {
    const headersConfig: Record<string, string> = {
      Accept: 'application/json',
    };

    switch (contentType) {
      case 'file':
        break;

      case 'form-data':
        headersConfig['Content-Type'] = `application/x-www-form-urlencoded`;
        break;

      case 'multipart-form-data':
        headersConfig['Content-Type'] = `multipart/form-data`;
        break;

      case '':
        headersConfig['Content-Type'] = `application/json`;
        break;
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: unknown): Observable<never> {
    return throwError(() => error);
  }
}
