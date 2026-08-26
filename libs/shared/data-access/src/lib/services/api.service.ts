import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject('BaseUrl') private baseUrl: string
  ) {}

  get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    contentType?: string,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${path}`, {
        headers,
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  post<T>(
    path: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, {
        headers,
        params: params ? params : new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  postWithAuth<T>(
    path: string,
    body: any,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, {
        headers,
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(
    path: string,
    body: any = {},
    params?: HttpParams,
    contentType?: string
  ): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType ? contentType : ''),
        params: params ? params : new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  patch<T>(
    path: string,
    body: any = {},
    params?: HttpParams,
    contentType?: string
  ): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType ? contentType : ''),
        params: params ? params : new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(
    path: string,
    contentType?: string,
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${path}`, {
        headers: this.setHeaders(contentType ? contentType : ''),
        params: params ? params : new HttpParams(),
      })
      .pipe(catchError(this.formatErrors));
  }

  file(path: string, file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file, file?.name);
    return this.http
      .post(`${this.baseUrl}${path}`, formData)
      .pipe(catchError(this.formatErrors));
  }

  getFile<T>(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      params: params,
      responseType: 'blob' as 'json',
    });
  }

  postFile<T>(
    path: string,
    fileDetails?:any,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http.post<T>(`${this.baseUrl}${path}`, fileDetails,{
      params: params,
      responseType: 'blob' as 'json',
    });
  }

  public upload<T>(path: string, file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file, file?.name);
    return this.http.request(
      new HttpRequest('POST', `${this.baseUrl}${path}`, formData, {
        reportProgress: false,
      })
    );
  }

  private setHeaders(contentType: string): HttpHeaders {
    const headersConfig: { [key: string]: string } = {
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

      default:
        headersConfig['Content-Type'] = `application/json`;
        break;
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: Error) {
    return throwError(error);
  }
}
