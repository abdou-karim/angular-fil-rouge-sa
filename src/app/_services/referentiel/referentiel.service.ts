import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Referentiels} from '../../modeles/referentiels';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {
  private API_URL = environment.apiUrl;
  constructor(private geneService: GeneralService,  private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // tslint:disable-next-line:typedef
  getReferentielR(value: number){
    return this.geneService.getAll(`${this.API_URL}/admin/referentiels?page=${value}&archivage=false`);
  }

  postReferentiel(objct: FormData){
    return this.http.post(`${this.API_URL}/admin/referentiels`, objct)
      .pipe(
        map(
          referentiel => {
            return referentiel
          }
        )
      );
  }
  sendEmailAndAddAppRef(id: number,tabEmail: string[]){
    return this.http.post(`${this.API_URL}/admin/referentiels/${id}/apprenants`, tabEmail, this.httpOptions)
      .pipe(
        map(reponse => {
          return reponse;
        })
      );
  }
  sendOneEmailAndAddAppRef(id: number,email: string[]){
    return this.http.post(`${this.API_URL}/admin/referentiels/${id}/apprenants`, {email}, this.httpOptions)
      .pipe(
        map(reponse => {
          return reponse;
        })
      );
  }
  deleteRef(id:number){
    return this.geneService.delete(`${this.API_URL}/admin/referentiels`, Number(`${id}`));
  }
}
