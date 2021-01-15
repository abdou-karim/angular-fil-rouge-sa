import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {retry, catchError, map} from 'rxjs/operators';
import {GeneralService} from '../general/general.service';
import {Utilisateur} from '../../modeles';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  page = 2;
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient, private generalService: GeneralService ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getAllUser(value: string): Observable<Utilisateur[]>
  {
    return  this.generalService.getAll(`${this.API_URL}/admin/users?page=${value}&archivage=false`);
  }
  // tslint:disable-next-line:typedef
  getUserId(id: number){
    return this.generalService.getModelById(`${this.API_URL}/admin/users`, Number(`${id}`));
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    return this.generalService.delete(`${this.API_URL}/admin/users`, Number(`${id}`));
  }

  // tslint:disable-next-line:typedef
  UpdateUser(object: object, id: number){
    console.log(object);
    return  this.http.put<any>(`${this.API_URL}/admin/users/${id}`, {object}, this.httpOptions)
      .pipe(
        retry(1),
        // tslint:disable-next-line:no-shadowed-variable
        map( Users => {
          return Users;
        })
      );

  }
  // tslint:disable-next-line:typedef
  addUser(objct: FormData){
    return this.http.post(`${this.API_URL}/admin/users`, objct)
      .pipe(
        map(
          users => {
            console.log(users);
          }
        )
      );
  }
}
