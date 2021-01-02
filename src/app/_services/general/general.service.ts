import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private API_URL = environment.apiUrl;
  // @ts-ignore
  private myUrl;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // @ts-ignore
  getAll(url): Observable<any>{
    return this.http.get<any>(`${url}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // tslint:disable-next-line:typedef
  delete(url: string, id: number) {
    return this.http.delete(`${url}/${id}`);
  }
  getModelById(url: string, id: string, url2?: string): Observable<any>{
    if (url2){
      this.myUrl = `${url}/${id}/${url2}`;
    }else {
      this.myUrl = `${url}/${id}`;
    }
    return this.http.get<any>(`${this.myUrl}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
